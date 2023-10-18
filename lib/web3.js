const ethers = require("ethers");
const FundAllocation = require("../contract/FundAllocation.json");

export async function connectWeb3() {
  let provider;
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
  }

  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    FundAllocation.contractAddress,
    FundAllocation.abi,
    signer
  );

  return { contract, signer, provider };
  // }
}
