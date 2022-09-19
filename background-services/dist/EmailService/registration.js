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
const emaildb_1 = __importDefault(require("../DatabaseHelpers/emaildb"));
const db = new emaildb_1.default();
dotenv_1.default.config();
// const SendEmails= async()=>{
// const pool = await mssql.connect(sqlConfig)
// const users: role[] = await (await db.exec("welcomeEmail")).recordset;
// const Roles:Role[]= await(await pool.request().query(`
//  SELECT * FROM users WHERE welcome='0'`)).recordset
//  for(let Role of Roles){
//     ejs.renderFile('templates/registration.ejs',{username:Role.username,Role:Role.role} ,async(error,data)=>{
//         let messageoption={
//             from:process.env.EMAIL,
//             to:Role.email,
//             subject:" account registration",
//             html:data,
//             attachments:[
//                 {
//                     fileusername:'Role.txt',
//                 }
//             ]
//         }
//         try {
//             await sendMail(messageoption)
//              await pool.request().query(`UPDATE users SET welcome='1' WHERE id = '${Role.id}'`)
//             console.log('Email is Sent');
//         } catch (error) {
//             console.log(error);
//         }
//     })
//  }
// }
// export default SendEmails
// import ejs from "ejs";
// import mssql from "mssql";
// import dotenv from "dotenv";
// import { sqlConfig } from "../Config/Config";
// dotenv.config();
// import sendMail from "../Helpers/Email";
// import Connection from "../DatabaseHelpers/db";
// const db = new Connection();
// interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   welcome: string;
// }
const SendEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(config_1.sqlConfig);
    const users = yield (yield db.exec("welcome")).recordset;
    for (let user of users) {
        ejs_1.default.renderFile("templates/registration.ejs", { name: user.username }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let messageoption = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "Welcome To Hezzy SendIT, Thanks for Signing Up!",
                html: data,
                attachments: [
                    {
                        filename: "user.text",
                        content: `Welcome email: ${user.username}`,
                    },
                ],
            };
            try {
                yield (0, email_1.default)(messageoption);
                yield db.exec("resetwelcome", { id: user.id });
                console.log("Welcome Email Sent");
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.default = SendEmails;
