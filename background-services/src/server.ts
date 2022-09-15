import express,{json} from 'express'
import SendEmails from './EmailService/registration';
 import cron from 'node-cron'
//import Sendadmin from './EmailService/status';
import Sendadmins from './EmailService/transit';
//  import SendEmails from './EmailService/service';
// import SendEmail from './EmailService/project';
const app = express()
const run =()=>{
  cron.schedule('*/30 * * * * *', async() => {
    console.log('running a  minute');
    await SendEmails()
    //  await Sendadmin()
    await Sendadmins()
   
  })
  }
  run()

app.use(json())

//app.use('/', route)

app.listen(6000,()=>{
    console.log("server is running at port 6000");
    
})