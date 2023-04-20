import jwt from "jsonwebtoken"; //Importación de jwt para generar token
import config from "../config"; //Importación de configuración para generar token
import Empleado from "../models/Empleado"; //Importación de modelo Empleado
import Rol from "../models/Rol"; //Importación de modelo Rol

//Metódo para verificar que exista un token
export const verifyToken = async (req, res, next) => {
    try {
        //Obtiene token desde el header x-access-token
        const token = req.headers["x-access-token"];

        console.log(token);

        //Si se guardo un token continua si no muestra un error
        if (!token) return res.status(403).json({ message: "No token provided" });

        //Obtiene los datos del usuario mediante el descifrado del token
        const decoded = jwt.verify(token, config.SECRET);

        //Obtiene IdEmpleado desde los datos descifrados
        req.IdEmpleado = decoded.id;

        //Busca al empleado en la base de datos mediante IdEmpleado
        const empleado = await Empleado.findById(req.IdEmpleado, { password: 0 });

        //Si encuentra el empleado continua si no muestra un error
        if (!empleado) return res.status(404).json({ message: "No empleado found" });

        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

//Metódo para verificar si un usuario tiene rol administrador
export const isAdmin = async (req, res, next) => {
    //Obtiene los datos del empleado mediante el IdEmpleado
    const empleado = await Empleado.findById(req.IdEmpleado);

    //Obtiene el nombre de los roles que posee el usuario
    const roles = await Rol.find({ _id: { $in: empleado.Rol } });

    //Comprueba si en los roles del usuario se encuentra el rol admin y continua si no muestra un error
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].Nombre === "admin") {
            next();
            return;
        }
    }

    return res.status(403).json({ message: "Require Admin role" });
}

//Metódo para verificar si un usuario tiene rol instructor
export const isInstructor = async (req, res, next) => {
    //Obtiene los datos del empleado mediante el IdEmpleado
    const empleado = await Empleado.findById(req.IdEmpleado);

    //Obtiene el nombre de los roles que posee el usuario
    const roles = await Rol.find({ _id: { $in: empleado.Rol } });

    //Comprueba si en los roles del usuario se encuentra el rol instructor y continua si no muestra un error
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].Nombre === "instructor") {
            next();
            return;
        }
    }

    return res.status(403).json({ message: "Require Instructor role" });
}

//Metódo para verificar si un usuario tiene rol mantenimiento
export const isMantenimiento = async (req, res, next) => {
    //Obtiene los datos del empleado mediante el IdEmpleado
    const empleado = await Empleado.findById(req.IdEmpleado);

    //Obtiene el nombre de los roles que posee el usuario
    const roles = await Rol.find({ _id: { $in: empleado.Rol } });

    //Comprueba si en los roles del usuario se encuentra el rol mantenimiento y continua si no muestra un error
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].Nombre === "mantenimiento") {
            next();
            return;
        }
    }

    return res.status(403).json({ message: "Require Mantenimiento role" });
}

//Metódo para verificar si un usuario tiene rol limpieza
export const isLimpieza = async (req, res, next) => {
    //Obtiene los datos del empleado mediante el IdEmpleado
    const empleado = await Empleado.findById(req.IdEmpleado);

    //Obtiene el nombre de los roles que posee el usuario
    const roles = await Rol.find({ _id: { $in: empleado.Rol } });

    //Comprueba si en los roles del usuario se encuentra el rol limpieza y continua si no muestra un error
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].Nombre === "limpieza") {
            next();
            return;
        }
    }

    return res.status(403).json({ message: "Require Limpieza role" });
}

//Metódo para verificar si un usuario tiene rol usuario
export const isUsuario = async (req, res, next) => {
    //Obtiene los datos del empleado mediante el IdEmpleado
    const empleado = await Empleado.findById(req.IdEmpleado);

    //Obtiene el nombre de los roles que posee el usuario
    const roles = await Rol.find({ _id: { $in: empleado.Rol } });

    //Comprueba si en los roles del usuario se encuentra el rol usuario y continua si no muestra un error
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].Nombre === "usuario") {
            next();
            return;
        }
    }

    return res.status(403).json({ message: "Require usuario role" });
}