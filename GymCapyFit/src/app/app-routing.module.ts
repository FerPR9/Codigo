import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { CheckInComponent } from './components/check-in/check-in.component';
import { CheckinEmployeeComponent } from './components/checkin/checkin-employee/checkin-employee.component';
import { ControlCheckinComponent } from './components/checkin/control-checkin/control-checkin.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { EmployeesListComponent } from './components/employee/employees-list/employees-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login-system/login/login.component';
import { RegrolComponent } from './components/regrol/regrol.component';
import { RegistrarRolComponent } from './components/roles/registrar-rol/registrar-rol.component';
import { RolListComponent } from './components/roles/rol-list/rol-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'signin', component: LoginComponent, pathMatch: 'full'},
  {path: 'control-rol', component: RolListComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'check', component: CheckInComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'control-check', component: ControlCheckinComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'check-employee', component: CheckinEmployeeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'check-employee/:id', component: CheckinEmployeeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'employees', component: EmployeesListComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'edit-emp/:id', component: AddEmployeeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'add', component: AddEmployeeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'registrar-rol', component: RegistrarRolComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'registrar', component: RegrolComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'editar/:id', component: RegrolComponent, pathMatch: 'full', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
