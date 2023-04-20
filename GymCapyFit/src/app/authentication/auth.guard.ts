//Documentación realizada por Juan Pablo Jimenez Jaime
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private capyfit: GymcapyfitService, private router: Router) { }

  canActivate(): any {// Define el método canActivate, que verifica si el usuario está autorizado a acceder a la ruta
    if (this.capyfit.loggedIn()) {// Si el usuario ha iniciado sesión (el método loggedIn del servicio GymcapyfitService devuelve true)
      return true;// Devuelve true para permitir el acceso a la ruta
    }

    this.router.navigate(['/signin']);// Si el usuario no ha iniciado sesión, redirige al usuario a la página de inicio de sesión utilizando el objeto Router
  }
  
}
