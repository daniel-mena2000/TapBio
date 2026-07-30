import { Router } from "express";
import { body } from "express-validator";
import { createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage } from "./handlers/index.js";
import { validationResult } from "express-validator"
import { handleInputErrors } from "./middleware/validation.js";
import { authenticate } from "./middleware/auth.js";

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

router.get('/user', authenticate, getUser)

router.patch('/user',
    body('name').notEmpty().withMessage('El nombre no puede ir vacio') ,
    body('handle').notEmpty().withMessage('El handle no puede ir vacio') ,
    body('description').notEmpty().withMessage('la descripcion no puede ir vacia') ,
    handleInputErrors,
    authenticate,
     updateProfile
)

//Para poder cambiar la imagen primero tiene que estar autenticado
router.post('/user/image', authenticate, uploadImage)

//Ruta dinamica para el handle del usuario, consultar la DB y traer la informacion ej: { handle: 'zuck' }
router.get('/:handle', getUserByHandle)

router.post('/search',
       body('handle').notEmpty().withMessage('El handle no puede ir vacio') ,
    handleInputErrors,
    searchByHandle
)

export default router
