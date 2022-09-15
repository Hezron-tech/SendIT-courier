import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/config'
import sendMail from '../Helpers/email'

dotenv.config()
interface Role{
    id:string
    username:string
    email:string
    password:string
    role:string
    welcome:string
    
}


const SendEmails= async()=>{
const pool = await mssql.connect(sqlConfig)
const Roles:Role[]= await(await pool.request().query(`
 SELECT * FROM users WHERE welcome='0'`)).recordset

 for(let Role of Roles){

    ejs.renderFile('templates/registration.ejs',{username:Role.username,Role:Role.role} ,async(error,data)=>{

        let messageoption={
            from:process.env.EMAIL,
            to:Role.email,
            subject:" account registration",
            html:data,
            attachments:[
                {
                    fileusername:'Role.txt',
                    
                }
            ]
        }

        try {
            
            await sendMail(messageoption)
             await pool.request().query(`UPDATE users SET welcome='1' WHERE id = '${Role.id}'`)
            console.log('Email is Sent');
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}

export default SendEmails