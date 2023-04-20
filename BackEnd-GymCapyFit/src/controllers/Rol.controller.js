//Documentación realizada por Juan Pablo Jimenez Jaime

import Rol from "../models/Rol"; //Importación de modelo Rol

//Metódo para obtener todos los roles
export const findAllRol = async (req, res) => {
    //Busca todos los roles
    const allRol = await Rol.find();
    res.json(allRol);
}

//Metódo para obtener un rol por Nombre
export const findOneRol = async (req, res) => {
    //Busca un rol que tenga un Nombre igual a req.params.id
    const oneRol = await Rol.find({ Nombre: req.params.id });
    res.json(oneRol);
}

//Metódo para crear un rol
export const createRol = async (req, res) => {
    //Asignación de datos del rol
    const newRol = new Rol({
        Nombre: req.body.Nombre,
        Descripcion: req.body.Descripcion,
        Privilegios: req.body.Privilegios
    });

    //Guarda el rol en la base de datos
    const rolSaved = await newRol.save();
    res.json(rolSaved);
}

//Metódo para borrar un rol por Nombre
export const deleteRol = async (req, res) => {
    //Elimina un rol que tenga un Nombre igual a req.params.id
    const deletedRol = await Rol.deleteOne({ Nombre: req.params.id });

    //Si elimina el rol continua si no muestra un error
    if (deletedRol.deletedCount == 0) return res.json({ message: "Rol Not Found" });

    res.json({
        message: 'Rol were deleted succesfully'
    });
}

//Metódo para actualizar un rol
export const updateRol = async (req, res) => {
    //Actualiza un rol que tenga un Nombre igual a req.params.id
    const updatedRol = await Rol.updateOne(
        { Nombre: req.params.id },
        { //Datos del rol a actualizar
            Descripcion: req.body.Descripcion,
            Privilegios: req.body.Privilegios
        });

    //Si actualiza el rol continua si no muestra un error
    if (updatedRol.modifiedCount == 0) return res.json({ message: "Rol Not Found" });

    res.json({
        message: "Rol was updated successfully"
    });
}