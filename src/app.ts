import express from "express";
import * as dotenv from "dotenv";
import { uploadMulter, uploadFile } from "./api/uploadController";
import { healthCheck } from "./api/healthCheckController";
import { queryIrysTx } from "./api/queryController";

dotenv.config();
const app = express();

// Health check endpoint
app.get("/api/healthcheck", healthCheck);

// File upload endpoint
app.post("/api/upload", uploadMulter.single("file"), uploadFile);

// Query Irys tx endpoint
app.get("/api/query/irys/:txid", queryIrysTx);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
