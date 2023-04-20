//Documentación realizada por Juan Pablo Jimenez Jaime

//Importación de modulos npm (express, morgan, cors)
import express from "express";
import morgan from "morgan";
import cors from "cors";

//Importación de rutas para cada colección de la base de datos
import CheckIn from "./routes/checkIn.routes";
import Empleado from "./routes/empleado.routes";
import Rol from "./routes/rol.routes";

const app = express(); //Definición de constante para configurar la aplicación

//Definición de puerto en el que va a correr el servidor
app.set('port', process.env.PORT || 4000);

//Uso de modulos npm (express, morgan, cors)
app.use(express.json()); //Definir uso de json en express
app.use(morgan('dev')); //Definir dev con morgan
app.use(cors()); //Definir uso de cors

//Rutas
//Ruta raíz del servidor
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my application' });
});

app.use('/api/checkin', CheckIn); //Ruta para acceder a checkin
app.use('/api/empleado', Empleado); //Ruta para acceder a empleado
app.use('/api/rol', Rol); //Ruta para acceder a rol

//Exportación de la configuración
export default app