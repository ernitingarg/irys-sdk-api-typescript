import Irys from "@irys/sdk";

class IrysClient {
  static instance: Irys;

  static async getInstance() {
    if (IrysClient.instance) {
      return IrysClient.instance;
    }

    const url = "https://devnet.irys.xyz";
    const providerUrl = "https://rpc-mumbai.maticvigil.com";
    const token = "matic";

    const client = new Irys({
      url,
      token,
      key: process.env.PRIVATE_KEY,
      config: { providerUrl }, // Optional provider URL, only required when using Devnet
    });

    console.log(`Wallet address = ${client.address}`);

    return (IrysClient.instance = client);
  }
}

export const getIrysClient = async () => {
  return await IrysClient.getInstance();
};
