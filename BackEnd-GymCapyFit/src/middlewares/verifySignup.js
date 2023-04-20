import Empleado from "../models/Empleado"; //Importación de modelo Empleado
import Rol from "../models/Rol"; //Importación de modelo Rol

//Metódo para verificar Id duplicada
export const checkDuplicatedId = async (req, res, next) => {
    //Busca un empleado con el IdEmpledo ingresado
    const empleado = await Empleado.findOne({ IdEmpleado: req.body.IdEmpleado });

    //Si el empleado existe retorna un error, si no continua con las demas operaciones
    if (empleado) return res.status(400).json({ message: "The empleado already exists" });

    next();
}

export const checkRolesExisted = async (req, res, next) => {
    //Busca los roles existentes en la base de datos
    const ROLES = await Rol.find({}, { "_id": 0, "Nombre": 1 });

    //Si existe un rol en el cuerpo del json empleado entra en la condición y comprueba que existe
    if (req.body.Rol) {
        for (let i = 0; i < req.body.Rol.length; i++) {
            console.log(ROLES[i].Nombre);
            if (!ROLES[i].Nombre.includes(req.body.Rol[i])) {
            }
        }
    }
    next();
}