import { create } from 'ipfs-http-client';



const IPFS = require('ipfs-api');
export  const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})




// Replace with your Infura credentials
const projectId = "2315a9b2b17745e38fcbadf6fee4f2e8";
const projectSecret = "your-project-secret";

// Create an authentication string
const auth = "Basic " + btoa(projectId + ":" + projectSecret);

export const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization: auth,
  },
});

