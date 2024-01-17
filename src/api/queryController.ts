import { Request, Response } from "express";
import { searchIrysTxs } from "../irys/sdk";

export const queryIrysTx = async (req: Request, res: Response) => {
  try {
    const { txid } = req.params;

    if (!txid) {
      return res.status(400).json({ error: "Invalid tx id" });
    }

    const result = await searchIrysTxs([txid]);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
