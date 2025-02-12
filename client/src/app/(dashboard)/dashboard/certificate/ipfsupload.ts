"use server"

import { client } from "./ipfs";


export async function ipfs_upload(file: any) {
    try {
      const added = await client.add(file);
      console.log("File uploaded to IPFS:", added.path);
      console.log("IPFS CID:", added.cid.toString());
      return added.cid.toString()
    } catch (error) {
      console.error("IPFS upload error:", error);
    }
  }