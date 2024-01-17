import { Request, Response } from "express";

export const healthCheck = (_req: Request, res: Response) => {
  res.status(200);
  res.send("OK");
};
