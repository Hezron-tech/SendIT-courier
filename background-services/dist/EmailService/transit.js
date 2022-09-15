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
dotenv_1.default.config();
const email_1 = __importDefault(require("../Helpers/email"));
const Sendadmins = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(config_1.sqlConfig);
    const parcels = yield (yield pool.request().query(`
SELECT * FROM parcels WHERE transit ='0'`)).recordset;
    for (let parcel of parcels) {
        ejs_1.default.renderFile('template/transit.ejs', { email: parcel.receiverEmail }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let messageoption = {
                from: process.env.EMAIL,
                to: parcel.receiverEmail,
                subject: "transit delivery status",
                html: data,
            };
            try {
                yield (0, email_1.default)(messageoption);
                yield pool.request().query(`UPDATE parcels SET transit='1' WHERE transit = '0'`);
                console.log('Email is Sent');
            }
            catch (error) {
                console.log(error);
            }
        }));
        ejs_1.default.renderFile('template/transit.ejs', { email: parcel.senderEmail }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let messageoption = {
                from: process.env.EMAIL,
                to: parcel.senderEmail,
                subject: "transit delivery status",
                html: data,
            };
            try {
                yield (0, email_1.default)(messageoption);
                yield pool.request().query(`UPDATE parcels SET transit='1' WHERE transit = '0'`);
                console.log('Email is Sent');
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.default = Sendadmins;
