//Documentación realizada por Juan Pablo Jimenez Jaime

import { Router } from "express"; //Importación Router de express
import { authJwt, verifySignup } from "../middlewares"; //Importación de middlewares authJwt y verifySignup

import * as empleadoController from "../controllers/Empleado.controller"; //Importación de metódos

const router = Router(); //Declaración de constante router para poder usar las rutas

//Ruta para obtener todos los empleados
router.get('/', empleadoController.findAllEmpleado);

//Ruta para obtener un empledo por IdEmpleado
router.get('/:id', empleadoController.findOneEmpleado);

//Ruta para crear un empleado 
//Verifica que existe token mediante authJwt.verifyToken
//Verifica que el usuario sea administrador mediante authJwt.isAdmin
//Verifica que los roles asignados al usuario existan mediante verifySignup.checkRolesExisted
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], empleadoController.createEmpleado);

//Ruta para borrar un empleado por IdEmpleado
//Verifica que existe token mediante authJwt.verifyToken
//Verifica que el usuario sea administrador mediante authJwt.isAdmin
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], empleadoController.deleteEmpleado);

//Ruta para actualizar un empleado por IdEmpleado
//Verifica que existe token mediante authJwt.verifyToken
//Verifica que el usuario sea administrador mediante authJwt.isAdmin
//Verifica que los roles asignados al usuario existan mediante verifySignup.checkRolesExisted
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], empleadoController.updateEmpleado);

//Ruta para registrar un usuario sin ser administrador y generar token
//Verifica si hay Id duplicada mediante verifySignup.checkDuplicatedId
//Verifica que los roles asignados al usuario existan mediante verifySignup.checkRolesExisted
router.post('/signup', [verifySignup.checkDuplicatedId, verifySignup.checkRolesExisted], empleadoController.signUp);

//Ruta para iniciar sesión y generar token
router.post('/signin', empleadoController.signin);

export default router //Exportación de las rutas