const { ethers } = require("ethers");
import { connectWeb3 } from "@/lib/web3";
import { ipfsClient } from "./ipfs-client";
import { toast } from "react-toastify";
import { fetchUsersAllRequestByStatus } from "./user-apis";

export async function getCurrentMetamaskAccount() {
  if (window.ethereum) {
    try {
      // Check if MetaMask is installed and connected
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed.");
      }

      // Request account access if not already granted
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the current user's Ethereum address
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length === 0) {
        throw new Error("No accounts found in MetaMask.");
      }

      const currentAccount = accounts[0];
      return currentAccount;
    } catch (error) {
      console.error("Error getting current MetaMask account:", error);
      return null;
    }
  }
}

export async function updateFundRequestData(
  contract,
  currentUser,
  requestDataToAdd
) {
  const currentIPFS = await getRequestsIPFSHash();
  const requestId = requestDataToAdd.requestId;
  const requestOwner = requestDataToAdd.requestOwner;

  let jsonData = {};
  if (currentIPFS === "") {
    if (!jsonData[requestOwner]) {
      jsonData[requestOwner] = {};
    }
    jsonData[requestOwner][requestId] = requestDataToAdd;
  } else {
    try {
      jsonData = await fetchIPFSData();
      if (!jsonData[requestOwner]) {
        jsonData[requestOwner] = {};
      }
      jsonData[requestOwner][requestId] = requestDataToAdd;
    } catch (error) {
      console.error("Error fetching or parsing data from IPFS:", error);
      return error;
    }
  }

  jsonData.updatedAt = new Date().toISOString();
  console.log("jsonData updated =============> ", jsonData);
  const updatedDataString = JSON.stringify(jsonData);

  try {
    const { cid } = await ipfsClient.add(updatedDataString);
    await contract.updateFundingRequest(cid.toString());
    console.log(
      "IPFS data updated successfully with new hash:",
      cid.toString()
    );
  } catch (error) {
    console.error("Error adding data to IPFS:", error);
  }
}

export async function getRequestsIPFSHash() {
  const { contract } = await connectWeb3();
  if (contract) {
    return await contract.fundRequestsIpfs();
  } else {
    return null;
  }
}

export async function fetchIPFSData() {
  const currentIPFS = await getRequestsIPFSHash();
  if (currentIPFS !== "") {
    const data = await fetch("https://ipfs.io/ipfs/" + currentIPFS);
    const jsonData = await data.json();
    // console.log("jsonData ============> ", jsonData);
    return await jsonData;
  }

  return {};
}

export function checkUserExists() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.role === "user") {
    return true;
  } else {
    return false;
  }
}

export function checkAdminExists() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.role === "admin") {
    return true;
  } else {
    return false;
  }
}

export async function login(data) {
  let user = await getCurrentMetamaskAccount();
  if (user) {
    const { contract, signer } = await connectWeb3();
    const res = await contract.login(data.username, data.password);
    if (res) {
      const currentUser = await signer.getAddress();
      const userDetails = await getUserByAddress(currentUser);
      let allowance =
        currentUser === (await getAdmin())
          ? await getBalanceof(currentUser)
          : await getAllowance(currentUser);
      return { ...userDetails, balance: allowance };
    } else {
      return res;
    }
  } else {
    console.log("Metamask not enabled");
  }
}

export async function getUserRequestCount() {
  try {
    const { contract } = await connectWeb3();
    if (!contract) {
      toast.error("Please connect metamask");
      return false;
    }
    const allRequests = await fetchUsersAllRequestByStatus("all");
    let requestsCount = {
      all: 0,
      pending: 0,
      completed: 0,
      approved: 0,
      denied: 0,
    };
    allRequests.forEach((request) => {
      if (request.status === 0) {
        requestsCount.pending++;
      } else if (request.status === 1) {
        requestsCount.approved++;
      } else if (request.status === 2) {
        requestsCount.completed++;
      } else if (request.status === 3) {
        requestsCount.denied++;
      }
      requestsCount.all++;
    });

    return requestsCount;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getAllUsersRequestsCount() {
  try {
    const { contract } = await connectWeb3();
    if (!contract) {
      toast.error("Please connect metamask");
      return false;
    }
    let requestsCount = {
      all: 0,
      pending: 0,
      completed: 0,
      approved: 0,
      denied: 0,
    };
    const allRequests = await fetchIPFSData();

    for (const userAddress in allRequests) {
      if (typeof allRequests[userAddress] === "object") {
        // Iterate through the inner object
        for (const requestId in allRequests[userAddress]) {
          const request = allRequests[userAddress][requestId];
          // if(request.installmentStatus === true){
          if (request.status === 0 && request.installmentStatus === true) {
            requestsCount.pending++;
          } else if (request.status === 1) {
            requestsCount.approved++;
          } else if (request.status === 2) {
            requestsCount.completed++;
          } else if (request.status === 3) {
            requestsCount.denied++;
          }
          requestsCount.all++;
        }
      }
    }

    return requestsCount;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getAllUsersInstallmentCount() {
  try {
    const { contract } = await connectWeb3();
    if (!contract) {
      toast.error("Please connect metamask");
      return false;
    }
    let count = 0;
    const allRequests = await fetchIPFSData();

    for (const userAddress in allRequests) {
      if (typeof allRequests[userAddress] === "object") {
        // Iterate through the inner object
        for (const requestId in allRequests[userAddress]) {
          const request = allRequests[userAddress][requestId];
          if (request.installmentStatus === true) {
            count++;
          }
        }
      }

      return count;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getUserByAddress(userAddress) {
  try {
    const { contract } = await connectWeb3();
    const res = await contract.registeredUsers(userAddress);
    if (res[2] !== "") {
      let user = {
        name: res[0],
        role: res[1],
        username: res[2],
        userAddress: userAddress,
      };
      return user;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAdmin() {
  try {
    const { contract } = await connectWeb3();
    if (contract) {
      const res = await contract.admin();
      return res;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllowance(address) {
  const { contract } = await connectWeb3();
  const admin = await getAdmin();
  if (contract) {
    const allowance = Number(
      await contract.getAllowance(admin, ethers.getAddress(address))
    );
    return allowance;
  }
}

export async function getBalanceof(address) {
  const { contract } = await connectWeb3();
  if (contract) {
    const res = Number(await contract.getBalanceof(ethers.getAddress(address)));
    return res;
  }
}

export async function getTransactionIPFS() {
  const { contract } = await connectWeb3();
  return await contract.alltransactions();
}

export async function getAllTransactions() {
  const currentIPFS = await getTransactionIPFS();
  if (currentIPFS !== "") {
    const data = await fetch("https://ipfs.io/ipfs/" + currentIPFS);
    const jsonData = await data.json();

    jsonData.sort(
      (a, b) =>
        new Date(b?.date_created ? b.date_created : 0) -
        new Date(a?.date_created ? a?.date_created : 0)
    );
    return await jsonData;
  }
  return [];
}

export async function addTransaction(data) {
  try {
    const { contract } = await connectWeb3();
    let jsonData = await getAllTransactions();
    if (!Array.isArray(jsonData)) {
      jsonData = [];
    }
    jsonData.push({ ...data, date_created: new Date().toISOString() });
    const updatedDataString = JSON.stringify(jsonData);
    const { cid } = await ipfsClient.add(updatedDataString);
    await contract.addTransaction(cid.toString());
    console.log(
      "IPFS data updated successfully with new hash:",
      cid.toString()
    );
  } catch (error) {
    console.error("Error adding data to IPFS:", error);
  }
}
