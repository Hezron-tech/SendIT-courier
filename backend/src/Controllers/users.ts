import { Request, RequestHandler, Response } from 'express'
import mssql from 'mssql'
import { v4 as uid } from 'uuid'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sqlConfig } from '../Config/config'
import Connection from '../DatabaseHelpers/db'
import { loginSchemas, UserSchema } from '../Helpers/validators'
import { Data, User } from '../Interfaces/userInterface'
const db = new Connection()


interface Extended extends Request {
  info?: Data;
}

interface ExtendedRequest extends Request {
  body: {
    username: string
    email: string
    password:string
  }
}
export const registerUsers = async (req: ExtendedRequest, res: Response) => {
  try {
    const id = uid()
    const { username, email,password } = req.body
    const { error, value } = UserSchema.validate(req.body)
    const hashedpassword = await bcrypt.hash(password, 10)
    db.exec('insertUsers',{id,username,email,password:hashedpassword})
    res.json({ message: 'user registered Successfully' })
  } catch (error) {
    res.json({ error })
  }
}




export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const { error, value } = loginSchemas.validate(req.body);
    if (error) {
      return res.status(500)
      .json({ error: error.details[0].message, success: false });
    }

    const userResult: User[] = await (
      await pool
        .request()
        .input("email", mssql.VarChar, email)
        .execute("getUser")
    ).recordset;

    const user: User = userResult[0]

    if (!user) {
      return res.status(404)
      .json({ message: "user not found", success: false });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: "invalid password", success: false });
    }
    const { password: _, ...rest } = user;
    

    const token = jwt.sign(rest, process.env.KEY as string, {
      expiresIn: "3600s",
    });
    console.log("Login user");
    
    res.json({ message: "successfully login", token, success: true, user: rest });
  } catch (error) {
    res.json({ error, success: false });
  }
};




export const getUsers: RequestHandler = async (req, res) => {
  try {
    const {recordset} =await db.exec('getUsers')
    res.json(recordset)
  } catch (error) {
    res.json({ error })
  }
}




export const checkUser = async (req: Extended, res: Response) => {
  
  
  if (req.info) {
    res.json({ name: req.info.username, role: req.info.role });
  }
};


