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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIrysQuery = void 0;
const query_1 = __importDefault(require("@irys/query"));
class IrysQuery {
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (IrysQuery.instance) {
                return IrysQuery.instance;
            }
            const url = "https://devnet.irys.xyz/graphql";
            const query = new query_1.default({ url: url });
            return (IrysQuery.instance = query);
        });
    }
}
const getIrysQuery = () => {
    return IrysQuery.getInstance();
};
exports.getIrysQuery = getIrysQuery;
