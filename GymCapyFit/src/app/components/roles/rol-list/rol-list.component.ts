//Documentación realizada por Carlos Eduardo Mata Rojas
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.css']
})
export class RolListComponent {
  selectedRol: any;
  roles: any = [];

  constructor(private capyfit: GymcapyfitService, private router: Router) {
    this.capyfit.getAllRoles().subscribe(
      resp=>{
        console.log(resp);
        this.roles = resp;
        this.selectedRol = this.roles[0];
      },
      err => console.error(err)
    );
  }

  ngOnInit(): void {}

  //Método para mostrar más información sobre el rol
  showModal(rol: any){
    this.selectedRol = rol;
  }

  //Método para eliminar el rol
  deleteRol(rol: any){
    console.log(rol.Nombre);
    this.capyfit.deleteRol(rol.Nombre).subscribe(res => {
      console.log(res);
    },err => { console.error(err)});
  }

  // Mostrar modal de confirmación para eliminar rol
  modalSWA2(rol: any){
    this.selectedRol = rol;
    Swal.fire({
      title: '¿Quieres borrar el rol?',
      text: 'Esta acción no se puede deshacer.',
      html: '<p>Rol: '+this.selectedRol.Nombre+'</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, hacerlo',
      confirmButtonColor: '#1a1a1a',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#b9b9b9',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Hecho!','Has eliminado al rol '+this.selectedRol.Nombre,'success').
        then((result) => {
          if(result.isConfirmed){
            window.location.reload();
          }
        });
        this.deleteRol(rol);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se ha eliminado al rol', 'error');
      }
    }); 
  }
}
