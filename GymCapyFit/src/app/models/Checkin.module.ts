export class CheckinModule {
    IdEmpleado?: number;
    Fecha: string;
    Hora: string;
    Tipo: string;
  
    constructor(IdEmpleado, Fecha, Hora, Tipo) {
      this.IdEmpleado = IdEmpleado;
      this.Fecha = Fecha;
      this.Hora = Hora;
      this.Tipo = Tipo;
    }
}  