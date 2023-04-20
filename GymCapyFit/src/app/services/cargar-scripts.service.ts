//Documentación realizada por Carlos Eduardo Mata Rojas
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarScriptsService {

  constructor() { }

    /**
   * Función para cargar archivos .js en la página.
   * @param archivos Arreglo con los nombres de los archivos a cargar, sin la extensión .js
   */
  cargarScr(archivos: string[]) {
    for (let archivo of archivos) {
      let script = document.createElement("script"); // Crear un elemento <script>
      script.src = "../assets/js/" + archivo + ".js"; // Establecer la ruta del archivo
      let body = document.getElementsByTagName("body")[0]; // Obtener el elemento <body> de la página
      body.appendChild( script ); // Agregar el elemento <script> al final del <body>
    }
  }
  //NOTA: Al final quedó descartado
}
