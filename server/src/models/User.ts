import mongoose, { Schema, Document } from "mongoose";

//Un schema es la forma que tendran los datos va muy relacionado con el modelo que estemos usando, en el caso de otros ORMS se define el modelo junto al schema, en el caso de mongoDB se define el schema y despues se asocia con el modelo
//Es parecido a una tabla en SQL, pero únicamente la definición.
//descripcion no sera requerido al iniciar sesion, este de editara ya dentro del panel de admin dentro de la vista ProfileView

export interface UserType extends Document {
    handle: string
    name: string
    email: string
    password: string
    description: string
}


const userSchema = new Schema({
    handle:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        trim: true //Indicamos que no acepta espacio es blanco
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true, //Indicamos que el email es unico
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    }
})

//Creando el modelo, toma 2 argumentos (nombre_del_modelo, modelo). dice: "Crea un modelo llamado User que utilizará la estructura definida en userSchema".
//Le asiganamos un generic para indicarme a la DB que tipos de datos va a esperar
const User = mongoose.model<UserType>('User', userSchema)

export default User
