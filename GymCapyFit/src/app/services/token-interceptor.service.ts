import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private capyfit:GymcapyfitService) { }

  // Este método intercepta todas las solicitudes HTTP salientes
  // y agrega el token de autenticación al encabezado "Authorization"
  intercept(req, next) {
    // Clona la solicitud original y agrega el token de autenticación
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: 'x-access-token ${this.capyfit.getToken()}'
      },
    });
    // Continúa con la solicitud HTTP con la solicitud clonada que tiene el token agregado
    return next.handle(tokenizeReq);
  }
}
