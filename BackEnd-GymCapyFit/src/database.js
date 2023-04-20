//Documentación realizada por Juan Pablo Jimenez Jaime

//Importación de mongoose y config
import mongoose from "mongoose";
import config from "./config";

//Metódo asincrono para conectar con la base de datos
(async () => {
    const db = await mongoose.connect(config.mongodbURL, //Función connect de mongoose usando URL Mongo Atlas
        { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log("Database is connected");
        }).catch((err) => {
            console.log("Conection Failed", err);
        })
})();