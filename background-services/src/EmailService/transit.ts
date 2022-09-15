import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/config'
dotenv.config()
import sendMail from '../Helpers/email'
interface Parcel{
    parcelId:string
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


const Sendadmins= async()=>{
const pool = await mssql.connect(sqlConfig)
const parcels:Parcel[]= await(await pool.request().query(`
SELECT * FROM parcels WHERE transit ='0'`)).recordset
 for(let parcel of parcels){
    ejs.renderFile('template/transit.ejs',{email:parcel.receiverEmail} ,async(error,data)=>{
        let messageoption={
            from:process.env.EMAIL,
            to:parcel.receiverEmail,
            subject:"transit delivery status",
            html:data,
        }

        try {
            
            await sendMail(messageoption)
            await pool.request().query(`UPDATE parcels SET transit='1' WHERE transit = '0'`)
            console.log('Email is Sent');
            
            
        } catch (error) {
            console.log(error);
            
        }


    })

    ejs.renderFile('template/transit.ejs',{email:parcel.senderEmail} ,async(error,data)=>{
        let messageoption={
            from:process.env.EMAIL,
            to:parcel.senderEmail,
            subject:"transit delivery status",
            html:data,
        }

        try {
            
            await sendMail(messageoption)
            await pool.request().query(`UPDATE parcels SET transit='1' WHERE transit = '0'`)
            console.log('Email is Sent');
            
            
        } catch (error) {
            console.log(error);
            
        }


    })
 }
}
export default  Sendadmins
