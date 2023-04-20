/*
  Documentación realizada por:
  Carlos Eduardo Mata Rojas
  Juan Pablo Jimenez Jaime
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckinModule } from '../models/Checkin.module';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GymcapyfitService {
  checkin: CheckinModule[];
  // URL del backend
  private URL = 'http://localhost:4000/api';
  constructor(private http: HttpClient, private router:Router) { }

  // Retorna un observable que emite un array de objetos CheckinModule.
  getAllCheckIn(): Observable<CheckinModule[]> {
    return this.http.get<CheckinModule[]>(this.URL + '/checkin');
  }

  // Realiza una petición POST a la API para crear un registro de entrada en el gimnasio.
  createCheckIn(checkin) {
    return this.http.post<any>(this.URL + '/checkin/', checkin);
  }

  // Realiza una petición GET a la API para obtener un listado de registros de entrada en el gimnasio
  // correspondientes a un empleado en una fecha dada.
  reviewCheckIn(idEmpleado, fecha) {
    return this.http.get(this.URL + '/checkin/reviewChecks/' + idEmpleado + '/' + fecha);
  }

  // Realiza una petición GET a la API para obtener un listado de todos los registros de entrada en el gimnasio.
  getCheckIn() {
    return this.http.get(this.URL + '/checkin');
  }

  // Realiza una petición GET a la API para obtener un listado de todos los empleados.
  getEmployees() {
    return this.http.get(this.URL + '/empleado');
  }

  // Realiza una petición GET a la API para obtener un objeto empleado con un id específico.
  getOneEmployee(id: String) {
    return this.http.get(`${this.URL}/empleado/${id}`);
  }

  // Realiza una petición POST a la API para crear un nuevo empleado.
  saveEmployye(newEmp) {
    return this.http.post<any>(`${this.URL}/empleado/signup`,newEmp);
  }

  // Realiza una petición PUT a la API para actualizar un empleado con un id específico.
  updateEmployee(id, emp, token){
    return this.http.put<any>(`http://localhost:4000/api/empleado/${id}`,emp, 
    {headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    }},);
  }

  // Realiza una petición DELETE a la API para eliminar un empleado con un id específico.
  deleteEmployee(id, token) {
    return this.http.delete(`${this.URL}/empleado/${id}`, 
    {headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    }},);
  }

  // Realiza una petición GET a la API para obtener un listado de registros de entrada en el gimnasio
  // correspondientes a un empleado con un id específico.
  getCheckEmployee(id: String) {
    return this.http.get(`${this.URL}/checkin/${id}`);
  }

  // Obtener el registro de check-in de un empleado en una fecha específica
  // Parámetros: id -> ID del empleado, fecha -> Fecha en formato de cadena
  getCheckDay(id, fecha: string){
    return this.http.get(`http://localhost:4000/api/checkin/checkDay/${id}/${fecha}`);
  }

  // Obtener información de un rol por su nombre
  // Parámetros: name -> Nombre del rol
  getOneRol(name: string) {
    return this.http.get(`${this.URL}/rol/${name}`);
  }

  // Obtener información de todos los roles
  getAllRoles() {
    return this.http.get(`${this.URL}/rol`);
  }

  // Guardar un nuevo rol en la base de datos
  // Parámetros: rol -> Objeto con la información del rol a guardar
  saveRol(rol){
    return this.http.post<any>(`http://localhost:4000/api/rol`,rol);
  }

  // Actualizar información de un rol existente
  // Parámetros: id -> ID del rol a actualizar, rol -> Objeto con la información actualizada del rol
  updateRol(id, rol){
    return this.http.put<any>(`http://localhost:4000/api/rol/${id}`,rol);
  }
  
  // Eliminar un rol por su nombre
  // Parámetros: nameRol -> Nombre del rol a eliminar
  deleteRol(nameRol: String){
    return this.http.delete<any>(`http://localhost:4000/api/rol/${nameRol}`);
  }

  // Verificar si un usuario ha iniciado sesión
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  // Obtener el token de acceso almacenado en el almacenamiento local
  getToken() {
    return localStorage.getItem('token');
  }

  // Cerrar la sesión del usuario y redirigirlo a la página de inicio de sesión
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('CRUD-EMPLEADO');
    localStorage.removeItem('CRUD-MANTENIMIENTO');
    localStorage.removeItem('CRUD-ROL');
    localStorage.removeItem('CRUD-CLASES');
    localStorage.removeItem('REVISAR-CHECKIN');
    this.router.navigate(['/signin']);
  }

  // Iniciar sesión con las credenciales de un empleado
  // Parámetros: empleado -> Objeto con las credenciales del empleado
  signIn(empleado) {
    return this.http.post<any>(this.URL + '/empleado/signin', empleado);
  }

  // Verificar si el usuario tiene permisos para realizar operaciones CRUD en los empleados
  crudEmpleado() {
    return !!localStorage.getItem('CRUD-EMPLEADO');
  }

  // Verificar si el usuario tiene permisos para realizar operaciones CRUD en los mantenimientos
  crudMantenimiento() {
    return !!localStorage.getItem('CRUD-MANTENIMIENTO');
  }

  // Verificar si el usuario tiene permisos para realizar operaciones CRUD en los roles
  crudRol() {
    return !!localStorage.getItem('CRUD-ROL');
  }

  crudClases() {
    return !!localStorage.getItem('CRUD-CLASES');
  }

  revisarCheckIn() {
    return !!localStorage.getItem('REVISAR-CHECKIN');
  }

}
