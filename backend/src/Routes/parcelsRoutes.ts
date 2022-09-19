import { Router } from "express";
import { deleteParcel, getParcel, getParcels, insertParcel, statusParcel, updateDelivered } from "../Controllers/parcels";



const routers =Router()

routers.post('/new',insertParcel )
routers.get('/all',getParcels )
routers.get('/:id',getParcel )
routers.get("/delete/:id", deleteParcel);
routers.put("/update/:id", updateDelivered);
routers.post("/status/:id", statusParcel);









export default routers