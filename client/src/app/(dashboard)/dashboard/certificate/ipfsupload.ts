"use server"

import { pinata } from "@/utils/config";
import { oneTimeJWT } from "./onetime-jwt";


export async function ipfs_upload(file: File) {
  try {
    
    const keyRequest = await oneTimeJWT();
    const keyData = keyRequest;
    console.log("keyData: ", keyData.data?.JWT)
    const JWT: string = keyData.data?.JWT ?? ""; // Use empty string if undefined

    if (!JWT) {
      throw new Error("JWT is undefined, cannot proceed with upload.");
    }
    
    const upload = await pinata.upload.file(file).key(JWT);
    const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash)
    console.log("Upload: ",upload.IpfsHash);
    console.log("ipfsurl: ", ipfsUrl)
    return {
      upload: upload,
      ipfsUrl: ipfsUrl
    }
  } catch (e) {
    console.log(e);
    // alert("Trouble uploading file");
  }
  }