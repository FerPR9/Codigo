//Documentación realizada por Carlos Eduardo Mata Rojas
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent {
  // Definimos las variables que usaremos
  filterPost=''; // Variable que usaremos para el filtro
  employees: any = []; // Array donde guardaremos los empleados
  roles: any = []; // Array donde guardaremos los roles

  token = localStorage.getItem('token');// Guardamos el token en una variable para usarlo en las peticiones

  // Creamos el constructor y llamamos al servicio para obtener los empleados
  constructor(private capyfit: GymcapyfitService,private router:Router) {
    this.capyfit.getEmployees().subscribe(
      resp=>{
        console.log(resp);
        this.employees = resp;// Guardamos los empleados en el array
      },
      err => console.error(err)
    );
  }

  ngOnInit(): void {}

  // Método que se ejecuta cuando se desea eliminar un empleado
  deleteEmployee(employee){
    console.log(employee);
    console.log(employee.IdEmpleado);
    Swal.fire({
      title: '¿Quieres elimanar el empelado?',
      text: 'Esta acción no se puede deshacer.',
      html: '<p><strong>Empleado: </strong>'+employee.Nombre+'</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, hacerlo',
      confirmButtonColor: '#1a1a1a',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#b9b9b9',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Hecho!', 
          text: 'Has eliminado al empleado '+employee.Nombre,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#1a1a1a',
        }).then((result) => {
          if(result.isConfirmed){
            window.location.reload();
          }
        });
        this.capyfit.deleteEmployee(employee.IdEmpleado, this.token).subscribe(res => {
          console.log(res)
        }, err => console.error(err));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado', 
          text: 'No se ha eliminado al empleado',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#1a1a1a',
        });
      }
    }); 
  }

  /**
 * Muestra un código QR para un empleado específico.
 * @param {object} empQR - El objeto de empleado con información para generar el código QR.
 */
  showQR(empQR){
    // Elimina la contraseña del objeto de empleado
    delete empQR.Password;
    let data = JSON.stringify(empQR);// Convierte el objeto de empleado en una cadena JSON
    let encodedData = encodeURIComponent(data);// Codifica la cadena JSON para que sea compatible con la URL
    // Crea la URL para generar el código QR con la API de QRServer
    let api = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodedData + '&size=250x250';
    console.log(api);
    console.log(data);
    // Crea una ventana emergente con el título "Consulta QR"
    // que contiene el nombre del empleado y el código QR generado
    Swal.fire({
      title: 'Consulta QR',
      html: '<p>'+empQR.Nombre+'</p><img src="'+api+'" height="250px" width="250px">',// height="50px" width="50px"
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#1a1a1a',
    });
  }

}
