//Documentación realizada por Carlos Eduardo Mata Rojas

import { Router } from "express"; //Importación Router de express

import * as checkInController from "../controllers/CheckIn.controller"; //Importación de metódos

const router = Router(); //Declaración de constante router para poder usar las rutas

router.get('/', checkInController.findAllCheckIn); //Ruta para obtener todos los checkin

router.get('/:id', checkInController.findOneCheckIn); //Ruta para obtener un checkin mediante IdEmpleado

router.post('/', checkInController.createCheckIn); //Ruta para crear un checkin

router.delete('/:id', checkInController.deleteCheckIn); //Ruta para eliminar checkin mediante IdEmpleado

router.put('/:id', checkInController.updateCheckIn); //Ruta para actualizar checkin mediante IdEmpleado

//Ruta para obtener la cantidad de checkin en un dia mediante IdEmpleado y Fecha
router.get('/reviewChecks/:id/:fecha', checkInController.findChecksInDay);

export default router //Exportación de las rutas