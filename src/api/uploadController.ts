import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import * as fs from "fs";
import { fundNodeLazily, uploadFileToArweave } from "../irys/sdk";

const destinationPath = "/tmp/uploads/";

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    cb(null, destinationPath);
  },
  filename: (_req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

export const uploadMulter = multer({ storage: storage });

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file found to be uploaded" });
    }

    const fileSizeInBytes = file.size;
    await fundNodeLazily(fileSizeInBytes);

    const tags = [
      { name: "filename", value: `${file.filename}` },
      { name: "originalname", value: `${file.originalname}` },
      { name: "mimetype", value: `${file.mimetype}` },
      { name: "size", value: `${file.size}` },
    ];

    const filePath = path.join(destinationPath, file.filename);
    const txId = await uploadFileToArweave(filePath, tags);

    res.status(200).json({
      filename: file.originalname,
      filesize: file.size,
      txId: `${txId}`,
      url_irys: `https://gateway.irys.xyz/${txId}`,
      url_arweave: `https://arweave.net/${txId}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
