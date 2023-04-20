//Documentación realizada por Carlos Eduardo Mata Rojas

import CheckIn from "../models/CheckIn"; //Importación de modelo CheckIn

//Metódo para obtener todos los checkin
export const findAllCheckIn = async (req, res) => {
    //Busca todos los checkin
    const allCheckIn = await CheckIn.find();
    res.json(allCheckIn);
}

//Metódo para obtener checkin por IdEmpleado
export const findOneCheckIn = async (req, res) => {
    //Busca un checkin que tenga IdEmpleado igual a req.params.id
    const oneCheckIn = await CheckIn.find({ IdEmpleado: req.params.id });
    res.json(oneCheckIn);
}

//Metódo para crear un checkin
export const createCheckIn = async (req, res) => {
    //Asignación de datos del checkin
    const newCheckIn = new CheckIn({
        IdEmpleado: req.body.IdEmpleado,
        Fecha: req.body.Fecha,
        Hora: req.body.Hora,
        Tipo: req.body.Tipo
    });

    //Guarda el checkin en la base de datos
    const checkInSaved = await newCheckIn.save();
    res.json(checkInSaved);
}

//Metódo para borrar un checkin
export const deleteCheckIn = async (req, res) => {
    //Elimina checkin que tenga IdEmpleado igual a req.params.id
    const deletedCheckIn = await CheckIn.deleteMany({ IdEmpleado: req.params.id });

    //Si elimina checkin continua si no muestra un error
    if (deletedCheckIn.deletedCount == 0) return res.json({ message: "CheckIn Not Found" });

    res.json({
        message: 'CheckIn were deleted succesfully'
    });
}

//Metódo para actualizar un checkin
export const updateCheckIn = async (req, res) => {
    //Actualiza un checkin que tenga IdEmpleado igual a req.params.id
    const updatedCheckIn = await CheckIn.updateOne(
        { IdEmpleado: req.params.id },
        { //Datos del checkin a actualizar
            Fecha: req.body.Fecha,
            Hora: req.body.Hora,
            Tipo: req.body.Tipo
        });

    //Si actualiza continua si no muestra un error
    if (updatedCheckIn.modifiedCount == 0) return res.json({ message: "CheckIn Not Found" });

    res.json({
        message: "CheckIn was updated successfully"
    });
}

//Metódo para obtener los checkin de un empleado por IdEmpleado y Fecha
export const findChecksInDay = async (req, res) => {
    //Busca los checkin con IdEmpleado igual a req.params.id y Fecha igual a req.params.fecha
    const checkIns = await CheckIn.find({ IdEmpleado: req.params.id, Fecha: req.params.fecha });

    console.log("Encotrados " + checkIns + " CheckIn");

    //Regresa la cantida de checkin encontrados
    res.json(checkIns);
}