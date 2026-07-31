import { Request, Response, NextFunction } from "express"
import  jwt  from "jsonwebtoken"
import User from "../models/User.js"
import { UserType } from '../models/User.js'

declare global {
  namespace Express {
    interface Request {
      user?: UserType
    }
  }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
const bearer = req.headers.authorization

    if (!bearer) {
         return res.status(401).json({
        error: 'No autorizado'
             })
    }
    const [, token] = bearer.split(' ')

    if (!token) {
         return res.status(401).json({
        error: 'No autorizado'
            })
    }
    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)

        if (typeof result === 'object' && result.id) {
            const user = await User.findById(result.id).select('-password')
            if (!user) {
                 return res.status(401).json({
                    error: 'No autorizado'
                        })
            }
            req.user = user
            next()
        }

    } catch (error) {
        return res.status(401).json({
            error: 'Token no válido'
        })
    }

}
