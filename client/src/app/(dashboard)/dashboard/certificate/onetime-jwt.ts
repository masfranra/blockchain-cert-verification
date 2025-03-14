import { pinata } from "@/utils/config"

export const dynamic = "force-dynamic";

export async function oneTimeJWT() {
  try {
    const uuid = crypto.randomUUID();
    const keyData = await pinata.keys.create({
      keyName: uuid.toString(),
      permissions: {
        endpoints: {
          pinning: {
            pinFileToIPFS: true,
          },
        },
      },
      maxUses: 1,
    })
    return {data :keyData};
  } catch (error) {
    console.log(error);
    return { error: "Error creating API Key:" };
  }
}