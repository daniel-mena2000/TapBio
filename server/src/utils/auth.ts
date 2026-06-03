import bcrypt from 'bcrypt'

// Tendremos 2 funciones una para hashear el password y otra para comparar los passwords y tener acceso

export async function hashPassword (password: string) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

//Esta funcion tomara 2 parametros, el password que el usuario este ingresando en el formulario y el password que este almacenado en la base de datos
//El enterPassword viene del req.body y el hash de user.password, y devuelve un boolean
//Usaremos el metodo "compare" de bcrypt toma los 2 parametro de la funcion
export async function checkPassword(enterPassword: string, hash: string) {
    return await bcrypt.compare(enterPassword, hash)

}
