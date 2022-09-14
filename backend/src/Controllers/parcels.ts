import { Request, RequestHandler, Response } from 'express'
import { v4 as uid } from 'uuid'
import Connection from '../DatabaseHelpers/db'
import { ParcelSchema } from '../Helpers/validators'
const db = new Connection()

interface ExtendedRequest extends Request {
  body: {
    parcelId:string,
    packageName:string
    destination:string
    senderEmail:string
    receiverEmail:string
    lat:string
    long:string
    weight:string
    price:string
    date:string
  }
}
export const insertParcel = async (req: ExtendedRequest, res: Response) => {
  try {
    const parcelId = uid()
    const { packageName, destination,senderEmail,receiverEmail,lat,long,weight,price,date } = req.body

    const { error, value } = ParcelSchema.validate(req.body)
    if (error) {
        return res.json({ error: error.details[0].message })
    }
    db.exec('insertParcel',{parcelId,packageName,destination,senderEmail,receiverEmail,lat,long,weight,price,date})
    res.json({ message: 'Parcel Inserted Successfully' })
  } catch (error) {
    res.json({ error })
  }
}




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