import { Request, RequestHandler, Response } from 'express'
import mssql from 'mssql'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../Config/config'
import Connection from '../DatabaseHelpers/db'
const db = new Connection()

interface ExtendedRequest extends Request {
  body: {
    username: string
    email: string
    password:string
  }
}
export const insertUsers = async (req: ExtendedRequest, res: Response) => {
  try {
    const id = uid()
    const { username, email,password } = req.body
    db.exec('insertUsers',{id,username,email,password})
    res.json({ message: 'user registered Successfully' })
  } catch (error) {
    res.json({ error })
  }
}