"use client"

import { useSearchParams } from "next/navigation";
import { handleRetrieveHash } from "@/app/(dashboard)/dashboard/certificate/blockchainUpload";
import {  useState } from "react";
import { DBfetch } from "./verify";

const VerifyCertificate = async () => {
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState("");
  const code = searchParams.get("code"); // Extracts 'code' from URL params

  const result = await DBfetch(code);
  console.log(result);
  if (result['blockchain_verified']) {
    // check if ipfs_cid is stored on blockchain
    console.log("Blcokchain verification")
    const hash_check = await handleRetrieveHash(result['cert_id']);
  }
  setVerifying("false")


  return <div>Certificate Code: {code}</div>;
};

export default VerifyCertificate;
