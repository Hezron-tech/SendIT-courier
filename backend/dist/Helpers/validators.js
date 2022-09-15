"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelSchema = exports.loginSchemas = exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(8),
});
exports.loginSchemas = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(8),
});
exports.ParcelSchema = joi_1.default.object({
    packageName: joi_1.default.string().required(),
    senderEmail: joi_1.default.string().required(),
    receiverEmail: joi_1.default.string().required(),
    destination: joi_1.default.string().required(),
    lat: joi_1.default.string().required(),
    long: joi_1.default.string().required(),
    weight: joi_1.default.number().required(),
    price: joi_1.default.number().required(),
    date: joi_1.default.string().required()
});
