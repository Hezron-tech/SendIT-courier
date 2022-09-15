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
const ejs_1 = __importDefault(require("ejs"));
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../Config/config");
const email_1 = __importDefault(require("../Helpers/email"));
dotenv_1.default.config();
const SendEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(config_1.sqlConfig);
    const Roles = yield (yield pool.request().query(`
 SELECT * FROM users WHERE welcome='0'`)).recordset;
    for (let Role of Roles) {
        ejs_1.default.renderFile('templates/registration.ejs', { username: Role.username, Role: Role.role }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let messageoption = {
                from: process.env.EMAIL,
                to: Role.email,
                subject: " account registration",
                html: data,
                attachments: [
                    {
                        fileusername: 'Role.txt',
                    }
                ]
            };
            try {
                yield (0, email_1.default)(messageoption);
                yield pool.request().query(`UPDATE users SET welcome='1' WHERE id = '${Role.id}'`);
                console.log('Email is Sent');
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.default = SendEmails;
