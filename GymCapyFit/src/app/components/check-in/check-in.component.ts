/* 
Documentación realizada por Juan Pablo Jimenez Jaime
Este componente se encarga de manejar la funcionalidad de check-in en la aplicación.
Se importa los módulos y servicios necesarios, como GymcapyfitService y Sweetalert2.

Atributos:
cameras: arreglo de dispositivos de cámara encontrados.
myDevice: dispositivo de cámara seleccionado.
scannerEnabled: booleano que indica si el escáner de código QR está habilitado o no.
results: arreglo de resultados obtenidos de los escaneos de código QR.
checkin: objeto que representa el check-in de un empleado.
turno: objeto que representa el turno de un empleado.
reviewCheckIn: objeto que representa la revisión del check-in de un empleado.
*/
import { Component, OnInit } from '@angular/core';
import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  //Método de inicialización del componente. No empleado en este caso
  ngOnInit(): void {
    
  }

  title = 'qr-reader';
  public cameras: MediaDeviceInfo[] = [];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled = false;
  public results: string[] = [];

  checkin = {
    IdEmpleado: 0,
    Fecha: "",
    Hora: "",
    Tipo: ""
  }

  turno?: any;

  reviewCheckIn: any;

  constructor(private checkInService: GymcapyfitService) {
    // TODO document why this constructor is empty
  }

  //Método que se encarga de manejar la respuesta cuando se encuentran cámaras disponibles.
  camerasFoundHandler(cameras: MediaDeviceInfo[]) {
    this.cameras = cameras;
    // Se selecciona la primera cámara por defecto
    this.selectCamera(this.cameras[0].label);
  }

  //Método que se encarga de seleccionar una cámara.
  selectCamera(cameraLabel: string) {
    this.cameras.forEach(camera => {
      if (camera.label.includes(cameraLabel)) {
        this.myDevice = camera;
        console.log(camera.label);
        // Se habilita el escáner de código QR
        this.scannerEnabled = true;
      }
    })
  }

  //Método que se encarga de crear un check-in de un empleado.
  createCheckIn(checkin) {
    console.log("Haciendo Checkin ...");
    this.checkInService.createCheckIn(checkin).subscribe(res => {
        console.log(res);
        // Se muestra una alerta de éxito
        this.openModal();
      },
        err => {
          console.log(err);
        });
  }

  //Método que se encarga de manejar la respuesta cuando se escanea un código QR correctamente.
  scanSuccessHandler(event: string) {
    this.results.unshift(event);

    // Se extraen los datos del empleado del código QR
    const dataEmpleado = JSON.parse(event);

    //Se almacenan los datos necesarios para el check-in
    this.checkin.IdEmpleado = dataEmpleado.IdEmpleado;
    this.checkin.Fecha = (new Date().getDate().toString() + "-" +
      new Date().getMonth().toString() + "-" +
      new Date().getFullYear().toString());
    this.checkin.Hora = (new Date().getHours().toString() + ":" + new Date().getMinutes().toString());

    //// Se revisa el historial de check-ins del empleado para determinar el tipo de check-in
    this.checkInService.reviewCheckIn(this.checkin.IdEmpleado, this.checkin.Fecha).subscribe(res => {
      this.reviewCheckIn = res;
      console.log(this.reviewCheckIn);

      // Se obtiene el turno del empleado y se determina el tipo de check-in a realizar
      this.checkInService.getOneEmployee(this.checkin.IdEmpleado.toString())
      .subscribe(res => {
        this.turno = res;
        console.log(this.turno.Turno);
        if (this.turno.Turno == "Matutino" || this.turno.Turno == "Vespertino") {
          console.log("El turno es Mat o Vesp");
          if (this.reviewCheckIn.length == 0) {
            this.checkin.Tipo = "Entrada";
            this.createCheckIn(this.checkin);

          } else if (this.reviewCheckIn.length == 1) {
            this.checkin.Tipo = "Salida";
            this.createCheckIn(this.checkin);

          } else {
            this.avisar();
          }
    
        } else if (this.turno.Turno == "Mixto") {
          if (this.reviewCheckIn.length == 0 || this.reviewCheckIn.length == 2) {
            this.checkin.Tipo = "Entrada";
            this.createCheckIn(this.checkin);
    
          } else if (this.reviewCheckIn.length == 1 || this.reviewCheckIn.length == 3) {
            this.checkin.Tipo = "Salida";
            this.createCheckIn(this.checkin);
          }
        }
      }, err => console.log(err)
      );

    },
    err => console.log(err)
    );
  }

  //Método que se encarga de mostrar un modal de registro exitoso.
  openModal(): void {
    this.scannerEnabled = false;
    Swal.fire({
      title: 'Registro exitoso',
      html: '<p> Empleado: '+this.checkin.IdEmpleado.toString()+'</p>',
      icon: 'success',

      focusConfirm: false,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#1a1a1a',
      customClass: {
        confirmButton: 'button-modal',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Acción cuando se hace clic en el botón de confirmación
        this.scannerEnabled = true;
      }
    });
  }

  //Método que se encarga de mostrar un modal de aviso cuando ya se han registrado todos los check-in en un día.
  avisar() {
    Swal.fire({
      title: 'Se han registrado todos los check-in',
      html: '<p> Empleado: '+this.checkin.IdEmpleado.toString()+'</p>',
      icon: 'info',
      focusConfirm: false,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#1a1a1a',
      customClass: {
        confirmButton: 'button-modal',
      }
    });
  }
}
