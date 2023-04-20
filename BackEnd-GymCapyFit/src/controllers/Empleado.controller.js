//Documentación realizada por Juan Pablo Jimenez Jaime

import Empleado from "../models/Empleado"; //Importación de modelo Empleado
import config from "../config"; //Importación de configuración para generar token
import jwt from "jsonwebtoken"; //Importación de jwt para generar token
import RolModel from "../models/Rol"; //Importacion de modelo Rol

//Metódo para obtener todos los empleados
export const findAllEmpleado = async (req, res) => {
    //Busca todos los empleados
    const allEmpleado = await Empleado.find();
    res.json(allEmpleado);
}

//Metódo para obtener un empleado por IdEmpleado
export const findOneEmpleado = async (req, res) => {
    //Busca un empleado que tenga un IdEmpleado igual a req.params.id
    const EmpleadoIdEmpleado = await Empleado.findOne({ IdEmpleado: req.params.id });
    res.json(EmpleadoIdEmpleado);
}

//Metódo para crear un empleado
export const createEmpleado = async (req, res) => {
    //Asignación de datos del empleado
    const newEmpleado = new Empleado({
        IdEmpleado: req.body.IdEmpleado,
        Nombre: req.body.Nombre,
        Edad: req.body.Edad,
        Rol: req.body.Rol,
        Telefono: req.body.Telefono,
        Sueldo: req.body.Sueldo,
        Turno: req.body.Turno,
        Correo: req.body.Correo,
        Password: req.body.Password
    });

    //Guarda el empleado en la base de datos
    const empleadoSaved = await newEmpleado.save();
    res.json(empleadoSaved);
}

//Metódo para borrar un empleado por IdEmpleado
export const deleteEmpleado = async (req, res) => {
    //Elimina un empleado que tenga un IdEmpleado igual a req.params.id
    const deletedEmpleado = await Empleado.deleteOne({ IdEmpleado: req.params.id });

    //Si elimina el empleado continua si no muestra un error
    if (deletedEmpleado.deletedCount == 0) return res.json({ message: "Empleado Not Found" });

    res.json({
        message: 'Empleado were deleted succesfully'
    });
}

//Metódo para actualizar un empleado
export const updateEmpleado = async (req, res) => {
    //Actualiza un empleado que tenga un IdEmpleado igual a req.params.id
    const updatedEmpleado = await Empleado.updateOne(
        { IdEmpleado: req.params.id },
        { //Datos del empleado a actualizar
            Nombre: req.body.Nombre,
            Edad: req.body.Edad,
            Rol: req.body.Rol,
            Telefono: req.body.Telefono,
            Sueldo: req.body.Sueldo,
            Turno: req.body.Turno,
            Correo: req.body.Correo,
            Password: await Empleado.encryptPassword(req.body.Password)
        });

    console.log(updatedEmpleado);

    //Si actualiza el empleado continua si no muestra un error
    if (updatedEmpleado.modifiedCount == 0) return res.json({ message: "Empleado Not Found" });

    res.json({
        message: "Empleado was updated successfully"
    });
}

//Metodos de Validación
//Metódo para registrar un empleado
export const signUp = async (req, res) => {
    //Definición de datos necesarios
    const { IdEmpleado, Nombre, Edad, Rol, Telefono, Sueldo, Turno, Correo, Password } = req.body;

    //Creación de empleado mediante modelo Empleado
    const newEmpleado = new Empleado(
        { //Datos empleado
            IdEmpleado,
            Nombre,
            Edad,
            Rol,
            Telefono,
            Sueldo,
            Turno,
            Correo,
            Password: await Empleado.encryptPassword(Password) //Encriptación de contraseña
        }
    );

    //Si existe el empleado tiene roles entra a la condición si no continua al else
    if (Rol) {
        //Busca los roles que tengan un Nombre igual al atributo Rol del empleado
        const foundRoles = await RolModel.find({ Nombre: Rol });

        //Guarda el Id de los roles en lugar del Nombre en el atributo del empleado
        newEmpleado.Rol = foundRoles.map(rol => rol._id);
    } else {
        //Busca el rol con Nombre "usuario"
        const rol = await RolModel.findOne({ Nombre: "usuario" });

        //Asigna el Id del rol "usuario" al atributo del empleado
        newEmpleado.Rol = rol._id;
    }

    //Guarda el empleado en la base de datos
    const savedEmpelado = await newEmpleado.save();
    console.log(savedEmpelado);

    //Genera el token del empleado mediante el Id del empleado y el atributo SECRET de config
    const token = jwt.sign({ id: savedEmpelado._id }, config.SECRET, {
        //El token expira despues de 12 horas
        expiresIn: 43200
    });

    //Regresa el token como json
    res.status(200).json({ token });
}

//Metódo para iniciar sesión
export const signin = async (req, res) => {
    //Busca un empleado que tenga un IdEmpleado igual a req.body.IdEmpleado
    const empleadoFound = await Empleado.findOne({ IdEmpleado: req.body.IdEmpleado }).populate("Rol");

    //Si encuentra el empleado continua si no muestra un error
    if (!empleadoFound) return res.status(400).json({ message: "Empleado not found" });

    //Verifica si la contraseña ingresada coincide con la que se encuentra en la base de datos
    const matchPassword = await Empleado.comparePassword(req.body.Password, empleadoFound.Password);

    //Si coincide la contraseña continua si no muestra un error
    if (!matchPassword) return res.status(401).json({ token: null, message: "Invalid Password" });

    //Genera el token del empleado mediante el Id del empleado y el atributo SECRET de config
    const token = jwt.sign({ id: empleadoFound._id }, config.SECRET, {
        //El token expira despues de 12 horas
        expiresIn: 43200
    });

    //Obtiene los privilegios del empleado mediante los roles que posee
    const privilegios = await RolModel.findById(empleadoFound.Rol, { _id: 0, Privilegios: 1 })
    console.log(privilegios);

    //Regresa el token y los privilegios como json
    res.json({ token, privilegios });
}

export const verificarRol = async (req, res) => {
    const EmpleadoIdEmpleado = await Empleado.find({ IdEmpleado: req.params.IdEmpleado });
    res.json(EmpleadoIdEmpleado);
}