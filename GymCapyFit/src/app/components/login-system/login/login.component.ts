//Documentación realizada por Juan Pablo Jimenez Jaime
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Definición de un objeto empleado con dos propiedades
  empleado = {
    IdEmpleado: 0,
    Password: ""
  }

  constructor(private capyfit: GymcapyfitService, private router: Router) { }

  // Método que se llama al enviar el formulario de inicio de sesión
  signin() {
    // Llamada al método de inicio de sesión del servicio Gymcapyfit, pasando las credenciales del empleado como argumento
    this.capyfit.signIn(this.empleado)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);

          for (let i = 0; i < res.privilegios.Privilegios.length; i++) { // Itera sobre la lista de privilegios devuelta por el método de inicio de sesión
            localStorage.setItem(res.privilegios.Privilegios[i], res.privilegios.Privilegios); // Guarda cada privilegio en el almacenamiento local del navegador
          }

          this.router.navigate(['']);
        },
        err => console.log(err)
      )
  }
}
