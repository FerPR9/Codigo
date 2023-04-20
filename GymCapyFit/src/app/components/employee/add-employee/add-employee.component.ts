//Documentación realizada por Carlos Eduardo Mata Rojas
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  // Se definen las propiedades del componente
  edit: boolean = false;// Indica si se está editando un empleado existente
  par: any;// Parámetro que se obtiene de la URL
  opcionesSeleccionadas: any[] = [];// Array para almacenar las opciones seleccionadas en los checkboxes
  opciones: any = [];// Array para almacenar las opciones de roles de los empleados

   // Objeto empleado que se usa para almacenar la información del empleado a agregar o editar
  empleado: any = {
    IdEmpleado: 0,
    Nombre: '',
    Edad: 0,
    Rol: [],
    Telefono: [],
    Sueldo: 0,
    Turno: '',
    Correo: '',
    Password: ''
  }

  // Objeto empleado que se usa para almacenar la información del empleado a agregar y enviarla al backend
  empPri: any = {
    IdEmpleado: 0,
    Password: ''
  }

  token = localStorage.getItem('token');// Token de autenticación que se obtiene del local storage

  // Constructor del componente, donde se inyectan los servicios que se usan en el componente
  constructor(private capyfit: GymcapyfitService, private router: Router, private activedRoute: ActivatedRoute) {
    // Se hace una petición al backend para obtener las opciones de roles disponibles y se almacenan en el array de opciones
    this.capyfit.getAllRoles().subscribe(
      resp=>{
        console.log(resp);
        this.opciones = resp;
        this.opciones = this.opciones.map(objeto => {
          return {...objeto, seleccionado: false};
        });
        console.log(this.opciones);
      },
      err => console.error(err)
    );
  }

  ngOnInit(): void {
    // Se obtienen los parámetros de la ruta activa
    const params = this.activedRoute.snapshot.params;
    // Se obtiene el elemento HTML del campo de entrada con id "inputFloat1" y se convierte en un elemento de tipo HTMLInputElement
    const ide = document.getElementById('inputFloat1') as HTMLInputElement;
    // Se obtiene el elemento HTML del encabezado con id "titke" y se convierte en un elemento de tipo HTMLHeadElement
    const titke = document.getElementById('titke') as HTMLHeadElement;
    // Se obtiene el elemento HTML del botón con id "bt" y se convierte en un elemento de tipo HTMLButtonElement
    const bt = document.getElementById('bt') as HTMLButtonElement;
    // Se asigna el valor del parámetro 'id' a la propiedad 'par' del componente
    this.par = params['id'];
    // Si existe el parámetro 'id' se ejecuta el siguiente bloque de código
    if(params['id']){
      console.log('Obvibobi');
      // Se llama al método getOneEmployee del servicio capyfit y se suscribe a la respuesta
      this.capyfit.getOneEmployee(params['id']).subscribe(res => {
        console.log(res);
        // Se asigna la respuesta a la propiedad 'empleado' del componente
        this.empleado = res;
        // Se limpia el campo 'Password' de la propiedad 'empleado'
        this.empleado.Password = '';
        // Se establece la propiedad 'edit' del componente en true
        this.edit = true;
        // Se establece el campo de entrada en modo de solo lectura
        ide.readOnly = true;
        // Se establece el texto del encabezado y del botón en "Edit"
        titke.textContent = "Edit";
        bt.textContent = "Edit";
      }, err => console.error(err));
    }
  }  

  signup() {
    //Se comprueba que ningún campo quede vacío
    if (!this.empleado.IdEmpleado || this.empleado.IdEmpleado === 0) {
      alert('Debe completar el campo .IdEmpleado.');
      return;
    }

    if (!this.empleado.Nombre || this.empleado.Nombre.trim() === '') {
      alert('Debe completar el campo Nombre.');
      return;
    }

    if (!this.empleado.Edad || this.empleado.Edad === 0) {
      alert('Debe completar el campo Edad.');
      return;
    }

    if (!this.empleado.Turno || this.empleado.Turno.trim() === '') {
      alert('Debe completar el campo Turmp.');
      return;
    }

    if (!this.empleado.Telefono || this.empleado.Telefono.length === 0) {
      alert('Debe completar el campo Tel.');
      return;
    }

    if (!this.empleado.Sueldo || this.empleado.Sueldo === 0) {
      alert('Debe completar el campo Sueldo.');
      return;
    }

    if (!this.empleado.Correo || this.empleado.Correo.trim() === '') {
      alert('Debe completar el campo Correo.');
      return;
    }

    if (!this.empleado.Password || this.empleado.Password.trim() === '') {
      alert('Debe completar el campo Password.');
      return;
    }

    let roles = [];
    this.opcionesSeleccionadas = [];
    for (let opcion of this.opciones) {
      if (opcion.seleccionado) {
        this.opcionesSeleccionadas.push(opcion.Nombre);
      }
    }
    this.empleado.Rol = this.opcionesSeleccionadas;
    console.log("Roles seleccionados:", this.opcionesSeleccionadas);
    console.log(this.empleado);

    this.capyfit.saveEmployye(this.empleado).subscribe(
      res => {
        console.log(res);
        this.empPri.IdEmpleado = this.empleado.IdEmpleado;
        this.empPri.Password = this.empleado.Password;
        console.log(this.empPri);
        this.setPrivileges();
      },
      err => console.log(err)
    );
  }

  editEmployee(){
    //Se comprueba que ningún campo quede vacío
    if (!this.empleado.Nombre || this.empleado.Nombre.trim() === '') {
      alert('Debe completar el campo Nombre.');
      return;
    }

    if (!this.empleado.Edad || this.empleado.Edad === 0) {
      alert('Debe completar el campo Edad.');
      return;
    }

    if (!this.empleado.Turno || this.empleado.Turno.trim() === '') {
      alert('Debe completar el campo Turmp.');
      return;
    }

    if (!this.empleado.Telefono || this.empleado.Telefono.length === 0) {
      alert('Debe completar el campo Tel.');
      return;
    }

    if (!this.empleado.Sueldo || this.empleado.Sueldo === 0) {
      alert('Debe completar el campo Sueldo.');
      return;
    }

    if (!this.empleado.Correo || this.empleado.Correo.trim() === '') {
      alert('Debe completar el campo Correo.');
      return;
    }

    if (!this.empleado.Password || this.empleado.Password.trim() === '') {
      alert('Debe completar el campo Password.');
      return;
    }

    delete this.empleado.IdEmpleado;
    delete this.empleado.Rol;
    this.capyfit.updateEmployee(this.par,this.empleado, this.token).subscribe(
    res => {
      console.log(res);
      this.router.navigate(['/employees']);
    },
    err => console.log(err));
  }

  setPrivileges(){
    this.capyfit.signIn(this.empPri)
    .subscribe(
      res => {
        console.log(res);

        for (let i = 0; i < res.privilegios.Privilegios.length; i++) {
          localStorage.setItem(res.privilegios.Privilegios[i], res.privilegios.Privilegios);
        }

        this.router.navigate(['/employees']);
      },
      err => console.log(err)
    )
  }
}

