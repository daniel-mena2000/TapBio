import { Router } from "express";
import { body } from "express-validator";
import { createAccount, login } from "./handlers/index.js";
import { validationResult } from "express-validator"
import { handleInputErrors } from "./middleware/validation.js";

const router = Router()
//Express validator tiene distintas validaciones, en este caso usaremos las de "req.body", y estas estaran antes de mandar llamar las funciones de handle o controllers
//Autenticacion y registro
router.post('/auth/register',
    body('handle').notEmpty().withMessage('El handle no puede ir vacio') ,
    body('name').notEmpty().withMessage('El name no puede ir vacio') ,
    body('email').isEmail().withMessage('email no valido') ,
    body('password').isLength({min: 8}).withMessage('Contraseña no valida, minimo 8 caracteres') ,

    handleInputErrors,

    createAccount)

router.post('/auth/login',
    body('email').isEmail().withMessage('email no valido') ,
    body('password').notEmpty().withMessage('Crea una contraseña valida') ,
    handleInputErrors,

    login
)

export default router
