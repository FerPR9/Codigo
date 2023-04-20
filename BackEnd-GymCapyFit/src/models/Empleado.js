//Documentación realizada por Juan Pablo Jimenez Jaime

import { Schema, model } from "mongoose"; //Importación Schema y model de mongoose
import bcrypt from 'bcryptjs'; //Importación bcrypt de bcryptjs para encriptación de contraseña

//Creación de esquema para la colección
const empleadoSchema = new Schema(
    { //Atributos de la colección
        IdEmpleado: {
            type: Number,
            required: true,
        },
        Nombre: {
            type: String,
            required: true
        },
        Edad: {
            type: Number,
            required: true
        },
        Rol: [{
            type: String,
            required: true
        }],
        Telefono: [{
            type: Number,
            required: true
        }],
        Sueldo: {
            type: Number,
            required: true
        },
        Turno: {
            type: String,
            required: true
        },
        Correo: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        }
    },
    { //Fecha de creación de cada documento
        timestamps: true,
        versionKey: false
    });

//Metódo para encriptar contraseña
empleadoSchema.statics.encryptPassword = async (Password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(Password, salt);
}

//Metódo para comparar contraseña en login
empleadoSchema.statics.comparePassword = async (Password, recivedPassword) => {
    return await bcrypt.compare(Password, recivedPassword);
}

export default model('Empleado', empleadoSchema); //Exportación del modelo basado en el esquema