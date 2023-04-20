import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor() {
    const objeto = {
      _id: '641a01663682e2f7236397f2',
      IdEmpleado: 1000000100,
      Nombre: "Juan Carlos",
      Edad: 22,
      Rol: [
        "640d0c6d3c3dc505208cf008",
        "640d0ef8246b0414f504eba5"
      ],
      Telefono: [
        4151006456
      ],
      Sueldo: 12000,
      Turno: "Vespertino",
      Correo: "jijijaja@guinxu.com",
      Password: "linux",
      // _id: '64114d9461f296ce7db3052e',
      // IdEmpleado: 1000000004,
      // Nombre: "limpieza",
      // Edad: 19,
      // Rol: [],
      // Telefono: [
      //   4151331602,
      //   4151006301
      // ],
      // Sueldo: 8000,
      // Turno: 'Vespertino',
      // Correo: 'limpieza@ibm.com',
      // Password: 'linux'
    };

    const objetoJSON = JSON.stringify(objeto);
    console.log(':________________');
    console.log(objetoJSON);
  }
}
