"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const healthCheck = (_req, res) => {
    res.status(200);
    res.send("OK");
};
exports.healthCheck = healthCheck;
