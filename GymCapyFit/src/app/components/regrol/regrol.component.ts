/*
Documentación realizada por Carlos Eduardo Mata Rojas
Este es un componente de Angular para la edición de roles.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/Rol';
import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';

@Component({
  selector: 'app-regrol',
  templateUrl: './regrol.component.html',
  styleUrls: ['./regrol.component.css']
})
export class RegrolComponent {
  seleccionados: string[] = [];

  newRol: Rol = {// Se inicializa el objeto que representa el rol a editar
    Nombre: '',
    Descripcion: '',
    Privilegios: []
  }

  constructor(private capyfit: GymcapyfitService,
    private activedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params; // Se obtienen los parámetros de la ruta
    const name = document.getElementById('nombre') as HTMLInputElement; // Se obtiene el elemento HTML
    name.readOnly = true; // Se define el campo de nombre como de sólo lectura
    // Se llama al método que obtiene los datos de un rol
    this.capyfit.getOneRol(params['id']).subscribe(res => {
      console.log(res);
      this.newRol = res;
    },err => console.error(err));
  }

  editar(){ // Se define el método que se ejecuta al editar un rol
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
    const selectedValues = [];

    for (let i = 0; i < checkboxes.length; i++) { // Se recorren los elementos seleccionados
      selectedValues.push(checkboxes[i].value); // Se agregan los valores a la propiedad de elementos seleccionados
    }

    if (this.newRol.Descripcion === '') { // Si la descripción está vacía
      this.newRol.Descripcion = 'Sin descripción'; // Se le asigna un valor por defecto
    }

    this.newRol.Privilegios = selectedValues;

    console.log(this.newRol);

    let name = this.newRol.Nombre;
  
    delete this.newRol.Nombre; // Se elimina la propiedad nombre del objeto del nuevo rol

    this.capyfit.updateRol(name,this.newRol).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/control-rol']);
      },
      err => console.log(err)
    );
  }

  noClick(){//En caso de quiera editar el nombre de le inidca que no se puede editar dicho campo
    const name = document.getElementById('nombre') as HTMLInputElement;
    if (name.readOnly) {
      alert("No puedes editar este campo");
    }
  }

}
