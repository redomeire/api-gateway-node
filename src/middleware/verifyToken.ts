import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config()

const { JWT_SECRET } = process.env

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    
    if(!authorization) {
        return res.status(401).json({
            status: 'error',
            message: 'unauthorized operation'
        })
    }
    
    const token = authorization.replace('Bearer ', '')

    jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
        if(err) {
            return res.status(403).json({ status: 'error', message: err.message })
        }

        return next()
    })
}

export default verifyToken
