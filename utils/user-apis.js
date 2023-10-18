import { connectWeb3 } from "@/lib/web3";
import { tabs } from "@/constants/constants";
import {
  addTransaction,
  checkUserExists,
  fetchIPFSData,
  updateFundRequestData,
} from "./common-apis";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export async function createInstallmentRequest(data) {
  try {
    const { contract, signer } = await connectWeb3();
    if (contract && checkUserExists()) {
      const currentUser = await signer.getAddress();
      const transaction = await contract.createInstallmentRequest(
        data.requestId,
        data.documents
      );
      // Wait for the transaction receipt to get the requestId from the emitted event
      const receipt = await transaction.wait();
      console.log(receipt);
      const requestData = await fetchRequestById(data.requestId);
      await updateFundRequestData(contract, currentUser, requestData);
      return requestData;
    } else {
      console.log("Please Connect Metamask");
    }
  } catch (error) {
    console.error("Error creating funding request:", error);
    return error;
  }
}

export async function createFundingRequest(data) {
  try {
    const { contract, signer } = await connectWeb3();
    if (contract && checkUserExists()) {
      const currentUser = await signer.getAddress();
      const transaction = await contract.createFundingRequest(
        data.title,
        data.description,
        parseFloat(data.amount),
        data.category,
        data.documents
      );
      // Wait for the transaction receipt to get the requestId from the emitted event
      const receipt = await transaction.wait();

      toast.warn("Please Wait ! It takes time");
      // Extract the requestId from the event logs
      const requestId = receipt.logs[0].args[1];
      const requestData = await fetchRequestByOwnerAndID(
        currentUser,
        requestId
      );
      // console.log("requestData ==============> ", requestData);
      await updateFundRequestData(contract, currentUser, requestData);
      return requestId;
    } else {
      console.log("Please Connect Metamask");
    }
  } catch (error) {
    console.error("Error creating funding request:", error);
    return null;
  }
}

export async function fetchRequestByOwnerAndID(requestOwner, requestId) {
  try {
    const { contract } = await connectWeb3();
    const userAddress = ethers.getAddress(requestOwner);
    if (!contract) {
      console.log("Please Connect Metamask or check contract configuration.");
      return null;
    }

    const transaction = await contract.getRequestDetailsByRequestId(
      userAddress,
      requestId
    );

    if (transaction) {
      let valuesArray = Object.values(transaction);
      let documentsHashes = transaction[9];
      let documentsArray = Object.values(documentsHashes);

      const requestData = {
        date_created: Number(valuesArray[0]),
        date_updated: Number(valuesArray[1]),
        requestId: valuesArray[2],
        requestOwner: valuesArray[3],
        title: valuesArray[4],
        description: valuesArray[5],
        totalAmount: Number(valuesArray[6]),
        approvedAmount: Number(valuesArray[7]),
        category: valuesArray[8],
        ipfsDocumentHashes: documentsArray,
        status: Number(valuesArray[10]),
        denialReason: valuesArray[11],
        installmentNumber: Number(valuesArray[12][0]),
        installmentStatus: Boolean(valuesArray[12][1]),
      };

      return requestData;
    }
  } catch (error) {
    console.error("Request Not Found", error);
    return null;
  }
}

export async function fetchRequestById(requestId) {
  try {
    const { contract, signer } = await connectWeb3();
    const currentUser = await signer.getAddress();
    if (contract && checkUserExists()) {
      const transaction = await contract.getRequestDetailsByRequestId(
        currentUser,
        requestId
      );
      if (transaction) {
        let valuesArray = Object.values(transaction);
        let documentsHashes = transaction[9];
        let documentsArray = Object.values(documentsHashes);

        const res = {
          date_created: Number(valuesArray[0]),
          date_updated: Number(valuesArray[1]),
          requestId: valuesArray[2],
          requestOwner: valuesArray[3],
          title: valuesArray[4],
          description: valuesArray[5],
          totalAmount: Number(valuesArray[6]),
          approvedAmount: Number(valuesArray[7]),
          category: valuesArray[8],
          ipfsDocumentHashes: documentsArray,
          status: Number(valuesArray[10]),
          denialReason: valuesArray[11],
          installmentNumber: Number(valuesArray[12][0]),
          installmentStatus: Boolean(valuesArray[12][1]),
        };
        return res;
      } else {
        return transaction;
      }
    } else {
      console.log("Please Connect Metamask");
    }
  } catch (error) {
    console.error("Request Not Found", error);
    return null;
  }
}

export async function fetchUsersAllRequestByStatus(currentTab) {
  try {
    if (checkUserExists()) {
      const { contract, signer } = await connectWeb3();
      if (contract && checkUserExists()) {
        const currentUser = await signer.getAddress();
        const ipfsData = await fetchIPFSData();
        let requestsData = [];
        // Iterate over addresses
        const allRequests = ipfsData[currentUser];
        if (allRequests.length === 0) {
          return [];
        }
        // filter requests
        for (const requestIdKey in allRequests) {
          const request = allRequests[requestIdKey];
          if (currentTab === "all") {
            requestsData.push(request);
          } else if (request.status === tabs[`${currentTab}`]) {
            requestsData.push(request);
          }
        }
        requestsData.sort((a, b) => a.date_updated - b.date_updated);
        return requestsData;
      } else {
        console.log("Please Connect Metamask");
      }
    } else {
      console.log("Please Login");
      return null;
    }
  } catch (error) {
    console.error("No Request Found", error);
    return null;
  }
}

export async function transferFromAdmin(data) {
  try {
    const { contract, signer } = await connectWeb3();
    const currentUser = await signer.getAddress();
    const receiver = ethers.getAddress(data.to);
    const transaction = await contract.transferFrom(receiver, data.amount);
    const receipt = await transaction.wait();
    if(receipt){
      let transaction = {
        from : currentUser,
        to : receiver,
        amount : data.amount
      }
      await addTransaction(transaction);
      return true;
    }
    else{
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
