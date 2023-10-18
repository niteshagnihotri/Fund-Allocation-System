
import { create } from 'kubo-rpc-client'

const projectID = process.env.NEXT_PUBLIC_IPFS_API_KEY;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_SECRET_KEY;
const auth =
  "Basic " + Buffer.from(projectID + ":" + projectSecret).toString("base64");

export const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

