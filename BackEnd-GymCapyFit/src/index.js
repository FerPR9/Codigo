//Documentación realizada por Juan Pablo Jimenez Jaime

import app from "./app"; //Importación de configuraciones de la aplicación
import "./database"; //Importación de la configuración de la base de datos

app.listen(app.get('port')); //Configuración de puerto de escucha
console.log("Server on port", app.get('port')); //Mensaje para indicar en que puerto se encuentra el servidor