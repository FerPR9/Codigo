import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as Instascan from 'instascan';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegrolComponent } from './components/regrol/regrol.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { GymcapyfitService } from './services/gymcapyfit.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ControlCheckinComponent } from './components/checkin/control-checkin/control-checkin.component';
import { CheckinEmployeeComponent } from './components/checkin/checkin-employee/checkin-employee.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { EmployeesListComponent } from './components/employee/employees-list/employees-list.component';
import { FormsModule } from '@angular/forms';
import { RolListComponent } from './components/roles/rol-list/rol-list.component';
import { RegistrarRolComponent } from './components/roles/registrar-rol/registrar-rol.component';
import { HomeComponent } from './components/home/home.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './components/login-system/login/login.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './authentication/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    CheckInComponent,
    NavbarComponent,
    RegrolComponent,
    ControlCheckinComponent,
    CheckinEmployeeComponent,
    AddEmployeeComponent,
    EmployeesListComponent,
    RolListComponent,
    RegistrarRolComponent,
    HomeComponent,
    FilterPipe,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ZXingScannerModule,
    HttpClientModule,
    SweetAlert2Module
  ],
  providers: [
    GymcapyfitService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
