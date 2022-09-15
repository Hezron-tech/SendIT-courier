import { Router } from "express";
import { checkUser, getUsers, loginUser, registerUsers } from "../Controllers/users";
import { VerifyToken } from "../Middlewares/verify";


const router =Router()

router.post('/register', registerUsers)
router.post('/login', loginUser)
router.get('/all', getUsers)
router.get('/checkuser', VerifyToken, checkUser)



export default router