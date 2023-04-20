//Documentación realizada por Carlos Eduardo Mata Rojas

import { Schema, model } from "mongoose"; //Importación Schema y model de mongoose

//Creación de esquema para la colección
const checkInSchema = new Schema(
    { //Atributos de la colección
        IdEmpleado: {
            type: Number,
            required: true
        },
        Fecha: {
            type: String,
            required: true
        },
        Hora: {
            type: String,
            required: true
        },
        Tipo: {
            type: String,
            required: true
        },
    },
    { //Fecha de creación de cada documento
        versionKey: false,
        timestamps: false
    });

export default model('CheckIn', checkInSchema); //Exportación del modelo basado en el esquema