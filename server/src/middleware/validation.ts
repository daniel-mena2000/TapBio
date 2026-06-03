import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator"

//Manejar errores
//validationResult de "express-validator" toma los datos que estamos enviando, que son los "req" y asi validar lo que enviamos
//En este caso si hay una peticion mal formada como que falte un campo, mandanra un error en formato json de la peticion

export function handleInputErrors(req: Request, res: Response, next: NextFunction) {

let errors = validationResult(req)
if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}) //400: error del cliente, o peticion mal formada
}
next()
}
