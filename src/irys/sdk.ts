import BigNumber from "bignumber.js";
import { getIrysClient } from "./client";
import { getIrysQuery } from "./query";

export const fundNodeLazily = async (size: number) => {
  const client = await getIrysClient();
  try {
    const price = await client.getPrice(size);
    const fundTx = await client.fund(price);

    console.log(
      `Successfully funded ${client.utils.fromAtomic(fundTx.quantity)} ${
        client.token
      }`
    );
  } catch (e) {
    console.log("Error funding node ", e);
  }
};

export const fundNode = async (amount: BigNumber.Value) => {
  const client = await getIrysClient();

  const fundTx = await client.fund(client.utils.toAtomic(amount));
  console.log(
    `Successfully funded ${client.utils.fromAtomic(fundTx.quantity)} ${
      client.token
    }`
  );
};

export const uploadFileToArweave = async (fileToUpload: string, tags: any) => {
  const client = await getIrysClient();

  const receipt = await client.uploadFile(fileToUpload, { tags: tags });
  console.log(`File uploaded successfully with tx id ${receipt.id}`);

  return receipt.id;
};

export const searchIrysTxs = async (txIds: string[]) => {
  const query = await getIrysQuery();

  return await query.search("irys:transactions").ids(txIds);
};
