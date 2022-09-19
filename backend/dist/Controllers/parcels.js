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
exports.statusParcel = exports.deleteParcel = exports.updateDelivered = exports.getParcel = exports.getParcels = exports.insertParcel = void 0;
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../DatabaseHelpers/db"));
const validators_1 = require("../Helpers/validators");
const db = new db_1.default();
const insertParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { packageName, destination, senderEmail, receiverEmail, lat, long, weight, price, date, } = req.body;
        const { error, value } = validators_1.ParcelSchema.validate(req.body);
        if (error) {
            return res
                .status(500)
                .json({ error: error.details[0].message });
        }
        db.exec("insertUpdateParcel", {
            id,
            packageName,
            destination,
            senderEmail,
            receiverEmail,
            lat,
            long,
            weight,
            price,
            date,
        });
        res
            .status(200)
            .json({ message: "Parcel Inserted Successfully" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.insertParcel = insertParcel;
const getParcels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recordset } = yield db.exec("allParcels");
        res.json(recordset);
    }
    catch (error) {
        res.status(500)
            .json({ error });
    }
});
exports.getParcels = getParcels;
const getParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { recordset } = yield db.exec("singleParcel", { id });
        if (!recordset[0]) {
            res.status(404)
                .json({ message: "Parcel Not Found" });
        }
        else {
            res.json(recordset);
        }
    }
    catch (error) {
        res.status(500)
            .json({ error });
    }
});
exports.getParcel = getParcel;
// export const updateParcel: RequestHandler<{ id: string }> = async (
//   req,
//   res
// ) => {
//   try {
//     const id = req.params.id;
//     const {
//       packageName,
//       destination,
//       senderEmail,
//       receiverEmail,
//       lat,
//       long,
//       weight,
//       price,
//       date,
//     } = req.body as {
//       packageName: string;
//       destination: string;
//       senderEmail: string;
//       receiverEmail: string;
//       lat: string;
//       long: string;
//       weight: string;
//       price: string;
//       date: string;
//     };
//     const { recordset } = await db.exec("singleParcel", { id });
//     if (!recordset[0]) {
//       res.status(404)
//       .json({ message: "Parcel Not Found" });
//     } else {
//       await db.exec("insertUpdateParcel", {
//         id,
//         packageName,
//         destination,
//         senderEmail,
//         receiverEmail,
//         lat,
//         long,
//         weight,
//         price,
//         date,
//       });
//       res.status(200)
//       .json({ message: "Parcel Updated ..." });
//     }
//   } catch (error) {
//     res.status(500)
//     .json({ error });
//   }
// };
const updateDelivered = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { recordset } = yield db.exec('updateParcel', { id });
        return res.json({ message: 'Updated...' });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updateDelivered = updateDelivered;
const deleteParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { recordset } = yield db.exec("singleParcel", { id });
        if (!recordset[0]) {
            res.status(404)
                .json({ message: "Parcel Not Found" });
        }
        else {
            // Procedure Way
            yield db.exec("softDeleteParcel", { id });
            res.json({ message: "Parcel Deleted" });
            // Query Way
            // await db.query(`DELETE FROM parcels WHERE id='${id}'`)
            // res.json({message:'Product Deleted'})
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.deleteParcel = deleteParcel;
const statusParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { recordset } = yield db.exec("singleParcel", { id });
        if (!recordset[0]) {
            res.status(404)
                .json({ message: "Parcel Not Found" });
        }
        else {
            yield db.exec("statusParcel", { id });
            res.json({ message: "Parcel Delivered" });
        }
    }
    catch (error) {
        res.status(500)
            .json({ error });
    }
});
exports.statusParcel = statusParcel;
