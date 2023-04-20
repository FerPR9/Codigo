//Documentación realizada por Juan Pablo Jimenez Jaime

import { Schema, model } from "mongoose"; //Importación Schema y model de mongoose

//Creación de esquema para la colección
const rolSchema = new Schema(
    { //Atributos de la colección
        Nombre: {
            type: String,
            required: true
        },
        Descripcion: {
            type: String,
            required: true
        },
        Privilegios: [{
            type: String,
            required: true
        }],
    },
    { //Fecha de creación de cada documento
        versionKey: false,
        timestamps: true
    });

export default model('Rol', rolSchema); //Exportación del modelo basado en el esquema