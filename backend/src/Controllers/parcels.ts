import { Request, RequestHandler, Response } from 'express'
import { v4 as uid } from 'uuid'
import Connection from '../DatabaseHelpers/db'
import { ParcelSchema } from '../Helpers/validators'
const db = new Connection()

interface ExtendedRequest extends Request {
  body: {
    id:string,
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
    const id = uid()
    const { packageName, destination,senderEmail,receiverEmail,lat,long,weight,price,date } = req.body

    const { error, value } = ParcelSchema.validate(req.body)
    if (error) {
        return res.json({ error: error.details[0].message })
    }
    db.exec('insertParcel',{id,packageName,destination,senderEmail,receiverEmail,lat,long,weight,price,date})
    res.json({ message: 'Parcel Inserted Successfully' })
  } catch (error) {
    res.json({ error })
  }
}




export const getParcels: RequestHandler = async (req, res) => {
  try {
    const {recordset} =await db.exec('allParcels')
    res.json(recordset)
  } catch (error) {
    res.json({ error })
  }
}

export const getParcel: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id  = req.params.id
    const {recordset} =await db.exec('singleParcel',{id})
    if (!recordset[0]) {
      res.json({ message: 'Parcel Not Found' })
    } else {
      res.json(recordset)
    }
  } catch (error) {
    res.json({ error })
  }
}



export const updateParcel: RequestHandler<{ id: string }> = async (
  req,
  res,
) => {
  try {
    const id= req.params.id
    const {packageName, destination,senderEmail,receiverEmail,lat,long,weight,price,date} = req.body as {
      
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
       const {recordset} =await db.exec('singleParcel',{id})
      if(!recordset[0]){
         res.json({ message: 'Parcel Not Found' })
      }else{
         await  db.exec('updateParcel',{id,packageName, destination,senderEmail,receiverEmail,lat,long,weight,price,date})
          res.json({message:'Parcel Updated ...'})
      }
 

  } catch (error:any) {
      res.json({ error })
  }
}



export const deleteParcel:RequestHandler<{id:string}> =async(req,res)=>{
    try {
        const id = req.params.id
        const {recordset} =await db.exec('singleParcel',{id})
        if(!recordset[0]){
         res.json({ message: 'Parcel Not Found' })
        }else{
          // Procedure Way
        await db.exec('softDeleteParcel', {id})
        res.json({message:'Parcel Deleted'})

        // Query Way
        // await db.query(`DELETE FROM parcels WHERE id='${id}'`)
        // res.json({message:'Product Deleted'})
      }
    } catch (error:any) {
       res.json({ error }) 
    }
}


export const statusParcel:RequestHandler<{id:string}> =async(req,res)=>{
  try {
      const id = req.params.id
      const {recordset} =await db.exec('singleParcel',{id})
      if(!recordset[0]){
       res.json({ message: 'Parcel Not Found' })
      }else{
        await db.exec('statusParcel', {id})
      res.json({message:'Parcel Delivered'})
    }
  } catch (error:any) {
     res.json({ error }) 
  }
}