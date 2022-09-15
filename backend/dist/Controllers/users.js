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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.getUsers = exports.loginUser = exports.registerUsers = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../Config/config");
const db_1 = __importDefault(require("../DatabaseHelpers/db"));
const validators_1 = require("../Helpers/validators");
const db = new db_1.default();
const registerUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { username, email, password } = req.body;
        const { error, value } = validators_1.UserSchema.validate(req.body);
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        db.exec('insertUsers', { id, username, email, password: hashedpassword });
        res.json({ message: 'user registered Successfully' });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.registerUsers = registerUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const { error, value } = validators_1.loginSchemas.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message, success: false });
        }
        const userResult = yield (yield pool
            .request()
            .input("email", mssql_1.default.VarChar, email)
            .execute("getUser")).recordset;
        const user = userResult[0];
        if (!user) {
            return res.json({ message: "user not found", success: false });
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.json({ message: "invalid password", success: false });
        }
        const { password: _ } = user, rest = __rest(user, ["password"]);
        const token = jsonwebtoken_1.default.sign(rest, process.env.KEY, {
            expiresIn: "3600s",
        });
        console.log("Login user");
        res.json({ message: "successfully login", token, success: true, user: rest });
    }
    catch (error) {
        res.json({ error, success: false });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recordset } = yield db.exec('getUsers');
        res.json(recordset);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getUsers = getUsers;
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        res.json({ name: req.info.username, role: req.info.role });
    }
});
exports.checkUser = checkUser;
