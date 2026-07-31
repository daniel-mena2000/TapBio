import mongoose from "mongoose";
import colors from 'colors'


export const connectDB = async () => {
    try {

      const connection = await mongoose.connect(process.env.MONGO_URI);


        console.log(colors.bgYellow.blue(`MongoDB conectado en: ${connection.connection.host}`));

    } catch (error) {
        console.error(colors.bgRed.white(`Error al conectar a MongoDB: ${error}`));
        process.exit(1); 
    }
}
