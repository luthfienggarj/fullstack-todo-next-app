// db.js merupakan tempat dimana konfigurasi antara mongoDB dengan UI Interface saling terhubung
import mongoose from "mongoose"

export const ConnectDB = async () => {
    // api ada di mongoDB connect > compass 
    await mongoose.connect('mongodb+srv://masboii:Luthfi886@cluster0.9r7bqih.mongodb.net/todo-app');
    console.log("DB Connected");
}