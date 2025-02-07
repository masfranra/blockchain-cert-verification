import { ethers, JsonFragment } from "ethers";
import abi from "@/lib/contractABI.json";
import { CONTRACT_ADDRESS } from "@/common/constants/api";



console.log("Address: ",CONTRACT_ADDRESS);

if (!CONTRACT_ADDRESS) {
  alert("❌ Contract address is missing.");
}

export const getContract = async () => {
    const { ethereum } = window as any;
    if (!ethereum) {
      alert("Please install MetaMask.");
      throw new Error("No crypto wallet found");
    }


    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    

    
};
