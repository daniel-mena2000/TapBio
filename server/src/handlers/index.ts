import type { Request, Response } from "express"
import slug from "slug"
import User from "../models/User.js"//Modelo
import cloudinary from "../config/cloudinary.js"
import { checkPassword, hashPassword } from "../utils/auth.js"
import { generateJWT } from "../utils/jwt.js"
import formidable from "formidable" //Es ideal para manejar imágenes, documentos o videos desde la computadora del usuario hacia tu servidor.

//Como req y res eran del router aqui en el handler necesitamos tiparlo, y esto nos lo da express
export const createAccount = async(req: Request, res: Response) => {


//Comprobar si el usuario ya ha sido registrado
//findOne es parecido a un WHERE en SQL, nos permite filtrar los datos en base a una condicion, traera la primera coincidencia, en este caso nos sirve ya que no abra un mismo usuario con un mismo email, si no existe dara null y si si existe nos traera toda la info
    const { email, password } = req.body
    const userExist = await User.findOne({email})

    if (userExist) {
        const error = new Error('El usuario con ese email ya esta registrado')
        return res.status(409).json({error: error.message})
    }
//Verificar que un handle ya existe
    const handle = `@${slug(req.body.handle, '_')}`
      const handleExist = await User.findOne({handle})

    if (handleExist) {
        const error = new Error('Nombre de usuario no disponible')
        return res.status(409).json({error: error.message})
    }

    const user = new User(req.body) //1. Creas una instancia del documento.
//Le pasamos el password de req.body, esta funcion en asyncrona por eso colocams await
    user.password = await hashPassword(password)
    user.handle = handle
//await req.user.save() es lo que guarda en MongoDB los cambios que hiciste sobre el documento.
    await user.save()


    res.send('Registro creado correctamente')//Es necesario finalizar con una respuesta ya sea con send o json
}




export async function login(req: Request, res: Response) {

//Para el login validaremos email y password
    const {email, password} = req.body
//Comenzaremos validando que aya un usuario registrado con un email existente en la DB
    const user = await User.findOne({email})
//En caso de que una persona quiera iniciar sesión con un usuario que no esta registrado entrara en este if
    if (!user) {
        const error = new Error('No se encontro una cuenta con este email.')
        return res.status(404).json({error: error.message})
    }
//Si la cuenta si existe salta aqui y comprobamos password, para eso usaremos un metodo de bcrypt la misma que nos genero el hash es la misma que nos dara el metodo para comprobar el password
//importante esperar con await a checkPassword
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error('Password Incorrecto.')
        return res.status(401).json({error: error.message})
    }

//Estás pasando todo el objeto "user" que te devolvió Mongoose. Pero no es seguro pasar todo ya que viene la contraseña ahi, es mas recomendable pasar el id
    const token = generateJWT({id: user.id})
    res.send(token) //Enviamos al frontend, en este caso en el frontend lo estamos recibiendo como {data} ya con la info destructurada, para poder guardarlo en localstorage
}

//Funcion para saber que usuario se esta autenticando es necesario su JWT
export async function getUser(req: Request, res: Response) {
    //console.log("Obteniendo usuario.....");

    const usr = await res.json(req.user)
    //console.log(usr);

}


export async function updateProfile(req: Request, res: Response) {
    try {
        const {description, links, name} = req.body

        const handle = `@${slug(req.body.handle, '_')}`
      const handleExist = await User.findOne({handle})

    if (handleExist && handleExist.email !== req.user.email) {
        const error = new Error('Nombre de usuario no disponible')
        return res.status(409).json({error: error.message})
    }
//Actualizar el usuario
req.user.name = name
req.user.description = description
req.user.handle = handle
req.user.links = links

//Para TypeScript, req.user es simplemente: handle,name,email,passwordy description ya que asi lo modificamos anteriormente, es por eso que save() nos marca error ya que req.user no sabe que es. es por eso que necesitamos extender de Document donde se encuentran estos metodos de mongoose, todo esto en User.ts
//También te recomiendo agregar una validación porque user es opcional:
if (!req.user) {
    return res.status(401).json({
        error: 'No autorizado'
    })
}
//Guardamos lo editado
await req.user.save()
res.send('Perfil actualizado correctamente')

    } catch (error) {
        return res.status(500).json({
            error: 'Hubo un error'
        })
    }
}


export const uploadImage = async (req: Request, res: Response) => {
//multiples: false: Indica que cada campo de archivo solo puede contener un archivo.
    const formi = formidable({multiples: false}) //Configuración del soporte

    try {
//Recibe 3 parametros
       formi.parse(req, (error, fields, files) => {
//Le pasamos nuestro "filepthat", {} son algunas configuraciones, y despues recibe una funcion asincrona, ya que va a interactuar con nuestra API, esta funcion recibe "error, result"
//result nos dara toda la info de claudinary entre esa info estara "secure_url" donde estara ya alojada la imagen
        cloudinary.uploader.upload(files.avatar[0].filepath, {}, async function(error, result) {

            if (error) {
              return res.status(500).json({
                error: 'Hubo un error al subir tu imagen'
                })
           }
           if (result) {
//Aignamos la imagen
            req.user.image = result.secure_url

            await req.user.save()

            res.json({image: result.secure_url})

           }


        })

       }) //Leyendo los datos que el usuario ingreso

    } catch (error) {
         return res.status(500).json({
            error: 'Hubo un error'
        })
    }
}

//Funcion que nos va a servir si la ruta del perfil de usuario al que se ingreso existe ej: http://localhost:5173/@mariana_react, si existe mostrar el perfil, si no mostrar pantalla de usuario no encontrado.
//req.params: para recuperar el usuario de la URL
export const getUserByHandle = async (req: Request, res: Response) => {
    try {
        const {handle} = req.params
//Nos queremos traer solo cierta info, asi que descartamos "id,version,email y password"
        const user = await User.findOne({handle}).select('-_id -__v -email -password')

        if (!user) {
            const error = new Error('El usuario no existe')
            return res.status(404).json({error: error.message})
        }
//Si si existe el usuario con ese handle
        res.json(user)

//Esta info se obtuvo haciendo pruebas desde Postman ej: http://localhost:4000/zuck
        //console.log(req.params); //salida: { handle: 'zuck' }
        //console.log(user);//muestra informacion del usuario solo si esta en la DB


    } catch (error) {
         return res.status(500).json({
            error: 'Hubo un error'
        })
    }
}

//Este controlador nos permite enviar al cliente, si un "slug" o nombre de usuario ya esta en uso y este no podra usarlo
export const searchByHandle = async (req: Request, res: Response) => {
    try {
        const {handle} = req.body
        const userExist = await User.findOne({handle})
//En este caso dara alerta si el usuario ya existe
        if (userExist) {
            const error = new Error(`(${handle}) Ya esta en uso 😢`)

            return res.status(409).json({error: error.message})
        }
//Si el slug esta disponible
        return res.send(`(${handle}) Esta disponible 👍`)

    } catch (error) {
         return res.status(500).json({
            error: 'Hubo un error'
        })
    }
}
