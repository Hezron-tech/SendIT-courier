import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/config'
dotenv.config()
import sendMail from '../Helpers/email'
interface Parcel{
    id:string
    packageName:string
    destination:string
    senderEmail:string
    receiverEmail:string
    lat:string
    long:string
    weight:string
    price:string
    date:string
    status:string
    transit:string
}


const SendStatus= async()=>{
const pool = await mssql.connect(sqlConfig)
const parcels:Parcel[]= await(await pool.request().query(`
SELECT * FROM parcels WHERE status ='pending'`)).recordset
 for(let parcel of parcels){
    ejs.renderFile('template/receiver.ejs',{email:parcel.receiverEmail} ,async(error,data)=>{
        let messageoption={
            from:process.env.EMAIL,
            to:parcel.receiverEmail,
            subject:"delivery status",
            html:data,
        }

        try {
            
            await sendMail(messageoption)
            await pool.request().query(`UPDATE parcels SET status='delivered' WHERE status = 'pending'`)
            console.log('Email is Sent');
            
            
        } catch (error) {
            console.log(error);
            
        }


    })

    ejs.renderFile('template/sender.ejs',{email:parcel.receiverEmail} ,async(error,data)=>{
        let messageoption={
            from:process.env.EMAIL,
            to:parcel.senderEmail,
            subject:"delivery status",
            html:data,
        }

        try {
            
            await sendMail(messageoption)
            await pool.request().query(`UPDATE parcels SET status='delivered' WHERE status = 'pending'`)
            console.log('Email is Sent');
            
            
        } catch (error) {
            console.log(error);
            
        }


    })
 }


}


export default  SendStatus
