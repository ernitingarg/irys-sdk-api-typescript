import Query from "@irys/query";

class IrysQuery {
  static instance: Query;

  static async getInstance() {
    if (IrysQuery.instance) {
      return IrysQuery.instance;
    }

    const url = "https://devnet.irys.xyz/graphql";

    const query = new Query({ url: url });

    return (IrysQuery.instance = query);
  }
}

export const getIrysQuery = () => {
  return IrysQuery.getInstance();
};
