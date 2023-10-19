import { connectWeb3 } from "@/lib/web3";
import { tabs } from "@/constants/constants";
import { toast } from "react-toastify";
import {
  addTransaction,
  checkAdminExists,
  fetchIPFSData,
  getAdmin,
  updateFundRequestData,
} from "./common-apis";
import { ethers } from "ethers";
import { fetchRequestByOwnerAndID } from "./user-apis";

export async function registerUser(data) {
  try {
    // console.log(data);
    const { contract, signer } = await connectWeb3();
    const currentUser = await signer.getAddress();
    const admin = await getAdmin();
    if (admin === currentUser && contract) {
      const address = ethers.getAddress(data.userAddress); // string to address
      const transaction = await contract.register(
        data.name,
        data.role,
        data.username,
        data.password,
        address
      );
      const receipt = await transaction.wait();
      if (transaction) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("Only Admin can call this function");
      return false;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function fetchAllUsersRequestsByStatus(currentTab) {
  try {
    if (checkAdminExists()) {
      const { contract } = await connectWeb3();
      if (contract && checkAdminExists()) {
        const ipfsData = await fetchIPFSData();
        let allIpfsData = Object.keys(ipfsData).filter(
          (key) => key !== "updatedAt"
        );
        let requestsData = [];
        // Iterate over addresses
        allIpfsData.forEach((addressKey) => {
          const address = ipfsData[addressKey];
          // Iterate over requests in each address
          for (const requestIdKey in address) {
            const request = address[requestIdKey];
            if (currentTab === "all") {
              requestsData.push(request);
            } else if (
              request.status === tabs[`${currentTab}`] &&
              request.installmentStatus === true
            ) {
              requestsData.push(request);
            }
          }
        });
        requestsData.sort((a, b) => a.date_updated - b.date_updated);
        // console.log(requ)
        return requestsData;
      } else {
        console.log("Please Connect Metamask");
      }
    } else {
      console.log("Please Login");
      return false;
    }
    // return [];
  } catch (error) {
    console.error("No Request Found", error);
    return null;
  }
}

export async function fetchInstallmentRequestsByNumber() {
  try {
    if (checkAdminExists()) {
      const { contract } = await connectWeb3();
      if (contract && checkAdminExists()) {
        const ipfsData = await fetchIPFSData();
        let allIpfsData = Object.keys(ipfsData).filter(
          (key) => key !== "updatedAt"
        );
        let requestsData = [];
        // Iterate over addresses
        allIpfsData.forEach((addressKey) => {
          const address = ipfsData[addressKey];
          // Iterate over requests in each address
          for (const requestIdKey in address) {
            const request = address[requestIdKey];
            if (request.installmentStatus === true) {
              requestsData.push(request);
            }
          }
        });
        requestsData.sort((a, b) => a.date_updated - b.date_updated);
        // console.log(requ)
        return requestsData;
      } else {
        console.log("Please Connect Metamask");
      }
    } else {
      console.log("Please Login");
      return false;
    }
    // return [];
  } catch (error) {
    console.error("No Request Found", error);
    return null;
  }
}

export async function transferInstallment(requestOwner, requestId) {
  try {
    if (checkAdminExists()) {
      const { contract, signer } = await connectWeb3();
      if (contract && checkAdminExists()) {
        let currentUser = await signer.getAddress();
        let localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser.userAddress !== currentUser) {
          toast.error("Only Admin can call this function");
          return false;
        }

        const transaction = await contract.transferInstallment(
          ethers.getAddress(requestOwner),
          requestId
        );

        const receipt = await transaction.wait();
        console.log(receipt);
        const requestData = await fetchRequestByOwnerAndID(
          ethers.getAddress(requestOwner),
          requestId
        );
        await updateFundRequestData(
          contract,
          ethers.getAddress(requestOwner),
          requestData
        );
        return true;
      } else {
        console.log("Please Connect Metamask");
      }
    } else {
      console.log("Please Login");
      return null;
    }
    // return [];
  } catch (error) {
    console.error("No Request Found", error);
    return null;
  }
}

export async function denyFundingRequest(requestOwner, requestId, reason) {
  try {
    if (checkAdminExists()) {
      const { contract, signer } = await connectWeb3();
      if (contract && checkAdminExists()) {
        let currentUser = await signer.getAddress();
        let localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser.userAddress !== currentUser) {
          toast.error("Only Admin can call this function");
          return false;
        }
        const transaction = await contract.denyFundingRequest(
          requestOwner,
          requestId,
          reason
        );
        const receipt = await transaction.wait();
        console.log(receipt);
        const requestData = await fetchRequestByOwnerAndID(
          requestOwner,
          requestId
        );
        await updateFundRequestData(contract, requestOwner, requestData);
        if (receipt) {
          return true;
        } else {
          return false;
        }
      } else {
        console.log("Please Connect Metamask");
      }
    } else {
      console.log("Please Login");
      return null;
    }
    // return [];
  } catch (error) {
    console.error("No Request Found", error);
    return null;
  }
}

export async function updateUserPassword(userAddress, username, password) {
  try {
    const { contract } = await connectWeb3();
    if (contract && checkAdminExists()) {
      const transaction = await contract.updateUserPassword(
        userAddress,
        username,
        password
      );
      const receipt = await transaction.wait();
      return receipt;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function transferFund(data) {
  try {
    const { contract, signer } = await connectWeb3();
    const currentUser = await signer.getAddress();
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser === localUser.userAddress) {
      const receiver = ethers.getAddress(data.to);
      const transaction = await contract.transferFund(receiver, data.amount);
      const receipt = await transaction.wait();
      if (transaction) {
        let transaction = {
          from: currentUser,
          to: receiver,
          amount: data.amount,
        };
        await addTransaction(transaction);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
