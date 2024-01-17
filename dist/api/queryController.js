"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryIrysTx = void 0;
const sdk_1 = require("../irys/sdk");
const queryIrysTx = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { txid } = req.params;
        if (!txid) {
            return res.status(400).json({ error: "Invalid tx id" });
        }
        const result = yield (0, sdk_1.searchIrysTxs)([txid]);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.queryIrysTx = queryIrysTx;
