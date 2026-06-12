import { Request, Response, NextFunction } from "express"
import  jwt  from "jsonwebtoken"
import User from "../models/User.js"
import { UserType } from '../models/User.js'

//`UserType` es simplemente una **interfaz de TypeScript** que describe la estructura que tiene un usuario. No viene ni de Express ni de Mongoose; normalmente la defines tú mismo.
//como no todas la rutas sera req.user, le colocamos ? ya que algunas rutas pueden ser privadas
declare global {
  namespace Express {
    interface Request {
      user?: UserType
    }
  }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
const bearer = req.headers.authorization
//Verificando que le enviamos y Header de autorizacion y tambien que tenga un JWT

    if (!bearer) {
         return res.status(401).json({
        error: 'No autorizado'
             })
    }
//Como el req, llega como [ "Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."] es decir tiene 2 posiciones, irnoramos el primero con una coma (,) ya que solo necesitamos el token
    const [, token] = bearer.split(' ')

    if (!token) {
         return res.status(401).json({
        error: 'No autorizado'
            })
    }
//Pasadas la validaciones anteriores, tenemos que usar "verify" esta nos la da JWT
//Recibe 2 parametro en token que estamos obteniendo, y SIGNATURE de nuestra variable de entorno
    try {
        const result = jwt.verify(token, process.env.JWT_SECRET) // result: { id: '6a21137e541f1e80f1d90', iat: 17807124, exp: 17971424 }
//Sacando solo el id de result
        if (typeof result === 'object' && result.id) {
//Le pasamos a nuestro modelo de mongoose ese id
            const user = await User.findById(result.id).select('-password')
            //console.log(user);
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
