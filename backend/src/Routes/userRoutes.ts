import { Router } from "express";
import { insertUsers } from "../Controllers/users";


const router =Router()

router.post('/register', insertUsers)


export default router