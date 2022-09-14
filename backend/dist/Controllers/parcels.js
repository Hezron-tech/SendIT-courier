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
exports.insertParcel = void 0;
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../DatabaseHelpers/db"));
const validators_1 = require("../Helpers/validators");
const db = new db_1.default();
const insertParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parcelId = (0, uuid_1.v4)();
        const { packageName, destination, senderEmail, receiverEmail, lat, long, weight, price, date } = req.body;
        const { error, value } = validators_1.ParcelSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        db.exec('insertParcel', { parcelId, packageName, destination, senderEmail, receiverEmail, lat, long, weight, price, date });
        res.json({ message: 'Parcel Inserted Successfully' });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.insertParcel = insertParcel;
// export const getProducts: RequestHandler = async (req, res) => {
//   try {
//     const {recordset} =await db.exec('getProducts')
//     res.json(recordset)
//   } catch (error) {
//     res.json({ error })
//   }
// }
// export const getProduct: RequestHandler<{ id: string }> = async (req, res) => {
//   try {
//     const id = req.params.id
//     const {recordset} =await db.exec('getProduct',{id})
//     if (!recordset[0]) {
//       res.json({ message: 'Product Not Found' })
//     } else {
//       res.json(recordset)
//     }
//   } catch (error) {
//     res.json({ error })
//   }
// }
// export const updateProduct: RequestHandler<{ id: string }> = async (
//   req,
//   res,
// ) => {
//   try {
//     const id= req.params.id
//     const { product, description } = req.body as {
//       product: string
//       description: string
//     }
//        const {recordset} =await db.exec('getProduct',{id})
//       if(!recordset[0]){
//          res.json({ message: 'Product Not Found' })
//       }else{
//          await  db.exec('updateProduct',{id,product,description})
//           res.json({message:'Product Updated ...'})
//       }
//   } catch (error:any) {
//       res.json({ error })
//   }
// }
// export const deleteProduct:RequestHandler<{id:string}> =async(req,res)=>{
//     try {
//         const id = req.params.id
//         const {recordset} =await db.exec('getProduct',{id})
//         if(!recordset[0]){
//          res.json({ message: 'Product Not Found' })
//         }else{
//           // Procedure Way
//         //   await db.exec('deleteProduct', {id})
//         // res.json({message:'Product Deleted'})
//         // Query Way
//         await db.query(`DELETE FROM Products WHERE id='${id}'`)
//         res.json({message:'Product Deleted'})
//       }
//     } catch (error:any) {
//        res.json({ error }) 
//     }
// }
