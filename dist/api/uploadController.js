"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.uploadMulter = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const sdk_1 = require("../irys/sdk");
const destinationPath = "/tmp/uploads/";
// Set up Multer storage
const storage = multer_1.default.diskStorage({
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
exports.uploadMulter = (0, multer_1.default)({ storage: storage });
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "No file found to be uploaded" });
        }
        const fileSizeInBytes = file.size;
        yield (0, sdk_1.fundNodeLazily)(fileSizeInBytes);
        const tags = [
            { name: "filename", value: `${file.filename}` },
            { name: "originalname", value: `${file.originalname}` },
            { name: "mimetype", value: `${file.mimetype}` },
            { name: "size", value: `${file.size}` },
        ];
        const filePath = path_1.default.join(destinationPath, file.filename);
        const txId = yield (0, sdk_1.uploadFileToArweave)(filePath, tags);
        res.status(200).json({
            filename: file.originalname,
            filesize: file.size,
            txId: `${txId}`,
            url_irys: `https://gateway.irys.xyz/${txId}`,
            url_arweave: `https://arweave.net/${txId}`,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.uploadFile = uploadFile;
