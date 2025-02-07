"use client"

// pages/index.js
import { useState } from "react";
import { getContract } from "@/lib/contract";

export default function Home() {
  const [documentId, setDocumentId] = useState("");
  const [documentHash, setDocumentHash] = useState("");
  const [retrievedHash, setRetrievedHash] = useState("");

  const handleStoreHash = async () => {
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

  const handleRetrieveHash = async () => {
    try {
      const contract = await getContract();
      const hash = await contract.getDocumentHash(documentId);
      console.log("Hash: ", hash);
      setRetrievedHash(hash);

    } catch (error: any) {
      console.error(error);
      alert("Failed to retrieve Hash");

    }
    
  };

  return (
    <div>
      <h1>Document Hash Storage</h1>
      <div>
        <input
          type="text"
          placeholder="Document ID"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Document Hash"
          value={documentHash}
          onChange={(e) => setDocumentHash(e.target.value)}
        />
        <button onClick={handleStoreHash}>Store Hash</button>
      </div>
      <div>
        <button onClick={handleRetrieveHash}>Retrieve Hash</button>
        {retrievedHash && <p>Retrieved Hash: {retrievedHash}</p>}
      </div>
    </div>
  );
}