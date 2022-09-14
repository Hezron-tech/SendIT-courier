import { Router } from "express";
import { insertParcel } from "../Controllers/parcels";



const routers =Router()

routers.post('/new',insertParcel )


export default routers