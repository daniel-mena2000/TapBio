import mongoose from "mongoose";
import colors from 'colors'


export const connectDB = async () => {
    try {

      const connection = await mongoose.connect(process.env.MONGO_URI);


        // Es mejor imprimir host y puerto en lugar de todo el objeto 'connection' para no saturar la consola
        console.log(colors.bgYellow.blue(`MongoDB conectado en: ${connection.connection.host}`));

    } catch (error) {
        console.error(colors.bgRed.white(`Error al conectar a MongoDB: ${error}`));
        process.exit(1); // Opcional: Detiene la aplicación si la base de datos no conecta
    }
}
