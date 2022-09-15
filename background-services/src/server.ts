import express,{json} from 'express'
import SendEmails from './EmailService/registration';
 import cron from 'node-cron'

import Sendadmins from './EmailService/transit';
import SendStatus from './EmailService/status';

const app = express()
const run =()=>{
  cron.schedule('*/30 * * * * *', async() => {
    console.log('running a  minute');
    await SendEmails()
    await SendStatus()
    await Sendadmins()
   
  })
  }
  run()

app.use(json())

//app.use('/', route)

app.listen(6000,()=>{
    console.log("server is running at port 6000");
    
})