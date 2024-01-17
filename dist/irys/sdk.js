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
exports.searchIrysTxs = exports.uploadFileToArweave = exports.fundNode = exports.fundNodeLazily = void 0;
const client_1 = require("./client");
const query_1 = require("./query");
const fundNodeLazily = (size) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, client_1.getIrysClient)();
    try {
        const price = yield client.getPrice(size);
        const fundTx = yield client.fund(price);
        console.log(`Successfully funded ${client.utils.fromAtomic(fundTx.quantity)} ${client.token}`);
    }
    catch (e) {
        console.log("Error funding node ", e);
    }
});
exports.fundNodeLazily = fundNodeLazily;
const fundNode = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, client_1.getIrysClient)();
    const fundTx = yield client.fund(client.utils.toAtomic(amount));
    console.log(`Successfully funded ${client.utils.fromAtomic(fundTx.quantity)} ${client.token}`);
});
exports.fundNode = fundNode;
const uploadFileToArweave = (fileToUpload, tags) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, client_1.getIrysClient)();
    const receipt = yield client.uploadFile(fileToUpload, { tags: tags });
    console.log(`File uploaded successfully with tx id ${receipt.id}`);
    return receipt.id;
});
exports.uploadFileToArweave = uploadFileToArweave;
const searchIrysTxs = (txIds) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield (0, query_1.getIrysQuery)();
    return yield query.search("irys:transactions").ids(txIds);
});
exports.searchIrysTxs = searchIrysTxs;
