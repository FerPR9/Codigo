//Documentación realizada por Carlos Eduardo Mata Rojas
import { Component } from '@angular/core';
import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';

@Component({
  selector: 'app-control-checkin',
  templateUrl: './control-checkin.component.html',
  styleUrls: ['./control-checkin.component.css']
})
export class ControlCheckinComponent {
  employees: any = [];

  constructor(private capyfit: GymcapyfitService) {
    // Obtiene la lista de empleados desde el servicio GymcapyfitService
    this.capyfit.getEmployees().subscribe(
      resp=>{
        console.log(resp);
        this.employees = resp;
      },
      err => console.error(err)
    );
  }
}

