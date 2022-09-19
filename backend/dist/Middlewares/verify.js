"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const VerifyToken = (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            return res.json({ message: "Please login first" });
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.KEY);
        req.info = data;
    }
    catch (error) {
        res.json({ error });
    }
    next();
};
exports.VerifyToken = VerifyToken;
