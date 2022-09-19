import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/config'
import sendMail from '../Helpers/email'
import  Connection  from '../DatabaseHelpers/emaildb'

const db= new Connection()

dotenv.config()
interface Role{
    id:string
    username:string
    email:string
    password:string
    role:string
    welcome:string
    
}


// const SendEmails= async()=>{
// const pool = await mssql.connect(sqlConfig)
// const users: role[] = await (await db.exec("welcomeEmail")).recordset;
// const Roles:Role[]= await(await pool.request().query(`
//  SELECT * FROM users WHERE welcome='0'`)).recordset

//  for(let Role of Roles){

//     ejs.renderFile('templates/registration.ejs',{username:Role.username,Role:Role.role} ,async(error,data)=>{

//         let messageoption={
//             from:process.env.EMAIL,
//             to:Role.email,
//             subject:" account registration",
//             html:data,
//             attachments:[
//                 {
//                     fileusername:'Role.txt',
                    
//                 }
//             ]
//         }

//         try {
            
//             await sendMail(messageoption)
//              await pool.request().query(`UPDATE users SET welcome='1' WHERE id = '${Role.id}'`)
//             console.log('Email is Sent');
            
//         } catch (error) {
//             console.log(error);
            
//         }


//     })

//  }


// }

// export default SendEmails


// import ejs from "ejs";
// import mssql from "mssql";
// import dotenv from "dotenv";
// import { sqlConfig } from "../Config/Config";
// dotenv.config();
// import sendMail from "../Helpers/Email";
// import Connection from "../DatabaseHelpers/db";
// const db = new Connection();
// interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   welcome: string;
// }

const SendEmails = async () => {
  const pool = await mssql.connect(sqlConfig);
  const users: Role[] = await (await db.exec("welcome")).recordset;
  


  for (let user of users) {
    ejs.renderFile(
      "templates/registration.ejs",
      { name: user.username },
      async (error, data) => {
        let messageoption = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Welcome To Hezzy SendIT, Thanks for Signing Up!",
          html: data,
          attachments: [
            {
              filename: "user.text",
              content: `Welcome email: ${user.username}`,
            },
          ],
        };

        try {
          await sendMail(messageoption);

          await db.exec("resetwelcome", { id: user.id });

          console.log("Welcome Email Sent");
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
};

export default SendEmails;