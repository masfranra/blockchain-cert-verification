import { getContract } from "@/lib/contract";





export const handleStoreHash = async (documentId:string, documentHash:string) => {
    try {
      const contract = await getContract();
      console.log("contract:", contract);
      const tx = await contract.storeDocumentHash(documentId, documentHash);
      console.log(tx);
      await tx.wait();
      alert("Document hash stored successfully!");
    } catch (error: any) {
      if (error.code === 4001) {
        alert("Transaction was rejected by the user.");
      } else {
        console.error(error);
        alert("An error occurred while storing the document hash.");
      }
    }
  };



  export const handleRetrieveHash = async (documentId: string) => {
    try {
      const contract = await getContract();
      const hash = await contract.getDocumentHash(documentId);
      console.log("Hash: ", hash);
      

    } catch (error: any) {
      console.error(error);
      alert("Failed to retrieve Hash");

    }
}