
import express, { NextFunction, Request, Response,json } from 'express'
import routers from './Routes/parcelsRoutes';
import router from './Routes/userRoutes';
const app = express();
app.use(json());

app.use('/users', router)
app.use('/parcel', routers)
app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({Error:err.message})
})

app.listen(5000, () => {
  console.log("server is running");
});