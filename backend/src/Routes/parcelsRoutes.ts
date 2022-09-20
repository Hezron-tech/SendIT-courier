import { Router } from "express";
import { deleteParcel, getParcel, getParcels, insertParcel, receivedParcels, sentParcels, statusParcel, updateDelivered, updateParcel } from "../Controllers/parcels";
import { VerifyToken } from "../Middlewares/verify";



const routers =Router()

routers.post('/new', VerifyToken,insertParcel )
routers.get('/all', getParcels )
routers.get('/receive/:receiverEmail',receivedParcels )
routers.get('/sent/:senderEmail',sentParcels )
routers.get('/:id' ,getParcel )
routers.delete("/delete/:id", deleteParcel);
routers.put("/updatestatus/:id",  updateDelivered);
routers.post("/update/:id",VerifyToken,updateParcel);
routers.post("/status/:id",statusParcel);











export default routers