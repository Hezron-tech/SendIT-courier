import { Router } from "express";
import { deleteParcel, getParcel, getParcels, insertParcel, statusParcel, updateParcel } from "../Controllers/parcels";



const routers =Router()

routers.post('/new',insertParcel )
routers.get('/all',getParcels )
routers.get('/:id',getParcel )
routers.post("/delete/:id", deleteParcel);
routers.put("/update/:id", updateParcel);
routers.post("/status/:id", statusParcel);









export default routers