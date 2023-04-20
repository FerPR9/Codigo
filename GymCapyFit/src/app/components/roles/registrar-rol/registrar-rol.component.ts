//Documentación realizada por Carlos Eduardo Mata Rojas
import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';

import { Rol } from 'src/app/models/Rol';

@Component({
  selector: 'app-registrar-rol',
  templateUrl: './registrar-rol.component.html',
  styleUrls: ['./registrar-rol.component.css']
})
export class RegistrarRolComponent{
  // Una lista para almacenar los nombres de los privilegios seleccionados
  seleccionados: string[] = [];

  // Un objeto Rol para almacenar los datos del nuevo rol
  newRol: Rol = {
    Nombre: '',
    Descripcion: '',
    Privilegios: []
  }

  // Las variables que se utilizan para bindear los inputs en el HTML
  nameRol: string;
  descRol: string = '';

  // Se utiliza ViewChild para obtener la referencia del input del nombre del rol en el HTML
  @ViewChild('nombre') nombre;

  constructor(private capyfit: GymcapyfitService, private router: Router) {
    
  }

  ngOnInit(): void {
    
  }

  registrar(){
    // Obtener los checkboxes seleccionados
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
    const selectedValues = [];

    // Almacenar los valores de los checkboxes seleccionados
    for (let i = 0; i < checkboxes.length; i++) {
      selectedValues.push(checkboxes[i].value);
    }

    // Validar que se haya ingresado un nombre para el rol
    if (this.nombre.nativeElement.value === '') {
      alert('Por favor ingrese un nombre válido');
      return;
    }// Si no se ingresó una descripción, se utiliza un valor por defecto
    if (this.descRol === '') {
      this.descRol = 'Sin descripción';
    }
    // Almacenar los datos del nuevo rol en el objeto newRol
    this.newRol.Nombre = this.nameRol;
    this.newRol.Descripcion = this.descRol;
    this.newRol.Privilegios = selectedValues;

    console.log(this.newRol);
    // Llamar al método saveRol del servicio GymcapyfitService para guardar el nuevo rol en la base de datos
    this.capyfit.saveRol(this.newRol).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/control-rol']);
      },
      err => console.log(err)
    );
  }

}
