"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const express_1 = __importStar(require("express"));
const registration_1 = __importDefault(require("./EmailService/registration"));
const node_cron_1 = __importDefault(require("node-cron"));
//import Sendadmin from './EmailService/status';
const transit_1 = __importDefault(require("./EmailService/transit"));
//  import SendEmails from './EmailService/service';
// import SendEmail from './EmailService/project';
const app = (0, express_1.default)();
const run = () => {
    node_cron_1.default.schedule('*/30 * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('running a  minute');
        yield (0, registration_1.default)();
        //  await Sendadmin()
        yield (0, transit_1.default)();
    }));
};
run();
app.use((0, express_1.json)());
//app.use('/', route)
app.listen(6000, () => {
    console.log("server is running at port 6000");
});
