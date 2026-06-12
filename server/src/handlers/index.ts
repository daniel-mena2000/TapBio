import type { Request, Response } from "express"
import slug from "slug"
import User from "../models/User.js"//Modelo
import { checkPassword, hashPassword } from "../utils/auth.js"
import { generateJWT } from "../utils/jwt.js"

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
    const handle = `${slug(req.body.handle, '')}`
      const handleExist = await User.findOne({handle})

    if (handleExist) {
        const error = new Error('Nombre de usuario no disponible')
        return res.status(409).json({error: error.message})
    }

    const user = new User(req.body) //1. Creas una instancia del documento.
//Le pasamos el password de req.body, esta funcion en asyncrona por eso colocams await
    user.password = await hashPassword(password)
    user.handle = handle
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
        const {description} = req.body

        const handle = `${slug(req.body.handle, '')}`
      const handleExist = await User.findOne({handle})

    if (handleExist && handleExist.email !== req.user.email) {
        const error = new Error('Nombre de usuario no disponible')
        return res.status(409).json({error: error.message})
    }
//Actualizar el usuario
req.user.description = description
req.user.handle = handle

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
