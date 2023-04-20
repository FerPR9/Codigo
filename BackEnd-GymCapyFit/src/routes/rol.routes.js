//Documentación realizada por Juan Pablo Jimenez Jaime

import { Router } from "express"; //Importación Router de express

import * as rolController from "../controllers/Rol.controller"; //Importación de metódos

const router = Router(); //Declaración de constante router para poder usar las rutas

router.get('/', rolController.findAllRol); //Ruta para obtener todos los roles

router.get('/:id', rolController.findOneRol); //Ruta para obtener un rol por Nombre

router.post('/', rolController.createRol); //Ruta para crear un rol

router.delete('/:id', rolController.deleteRol); //Rutar para borrar un rol por Nombre

router.put('/:id', rolController.updateRol); //Ruta para actualizar un rol por Nombre

export default router //Exportación de las rutas