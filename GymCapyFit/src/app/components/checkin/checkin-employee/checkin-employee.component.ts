// Documentación realizada por Carlos Eduardo Mata Rojas
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import Chart from 'chart.js/auto';
import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkin-employee',
  templateUrl: './checkin-employee.component.html',
  styleUrls: ['./checkin-employee.component.css']
})
export class CheckinEmployeeComponent implements OnInit {

  p: any; // Objeto que contendrá los parámetros de la URL
  emp: any; // Objeto que contendrá la información del empleado
  pla: any = []; // Array que contendrá la información de los check-in del empleado
  r: any = []; // Objeto que contendrá la información de un check-in
  dataCalendar: any = []; // Array que contendrá los datos del calendario
  @ViewChild('myChart', { static: true }) myChart!: ElementRef; // Elemento del DOM en el que se dibujará el gráfico
  chart!: Chart; // Objeto Chart de la librería Chart.js

  private calendar!: HTMLElement; // Elemento del DOM que representa al calendario
  private prevBtn!: HTMLElement; // Elemento del DOM que representa al botón para ir al mes anterior
  private nextBtn!: HTMLElement; // Elemento del DOM que representa al botón para ir al mes siguiente
  private monthTitle!: HTMLElement; // Elemento del DOM que representa al título del mes en el calendario
  private grid!: HTMLElement; // Elemento del DOM que representa a la grilla de días del calendario

  private date = new Date(); // Objeto de la clase Date que contendrá la fecha actual
  private year = this.date.getFullYear(); // Año actual
  private month = this.date.getMonth(); // Mes actual
  private today = this.date.getDate(); // Día actual

  private asistencias = []; // Array que contendrá las fechas de las asistencias del empleado
  private retardos = []; // Array que contendrá las fechas de los retardos del empleado


  constructor(private capyfit: GymcapyfitService, private route: ActivatedRoute) {
    const params = this.route.snapshot.params; // Obtenemos los parámetros de la URL
    this.p = params; // Asignamos los parámetros a la variable 'p'
    this.capyfit.getOneEmployee(params['id']).subscribe(
      res => {
        console.log("Empleado:");
        console.log(res);
        this.emp = res;// Asignamos la información del empleado a la variable 'emp'
        console.log(this.emp);
      },
      err => console.log(err)
    );
  }

  // Método que carga la información de los check-in del empleado
  cargarRet(){
    this.capyfit.getCheckEmployee(this.p['id']).subscribe(
      resp=>{
        this.pla = resp;
        // Se recorre cada uno de los check-in obtenidos
        this.pla.forEach(el => {
          // Si el tipo de check-in es 'Entrada', se procede a realizar el cálculo para determinar si hubo retardo o asistencia
          if(el.Tipo==='Entrada'){
            // Se separan las horas y minutos del check-in y se convierten en minutos totales
            let [hours1, minutes1] = el.Hora.split(":");
            let totalMinutes1 = parseInt(hours1) * 60 + parseInt(minutes1);
            let ho = "";
            console.log("Turno: "+this.emp.Turno);
            // Dependiendo del turno del empleado, se establece una hora de referencia para el cálculo
            if(this.emp.Turno==='Matutino'){
              ho = "08:05";
            } else {
              ho = "18:05";
            }
            // Se separan las horas y minutos de la hora de referencia y se convierten en minutos totales
            let [hours2, minutes2] = ho.split(":");
            let totalMinutes2 = parseInt(hours2) * 60 + parseInt(minutes2);
            // Si el check-in se hizo después de la hora de referencia, se considera que hubo retardo
            if(totalMinutes1>totalMinutes2){
              el.Estado = "Retardo";
            }else {
              // Si el check-in se hizo antes o en la hora de referencia, se considera que hubo asistencia
              el.Estado = "Asistencia";
            }
            // Se guarda el resultado en la variable 'r' 
            this.r = el;
          }
          // Se actualiza el calendario
          this.updateCalendar();
        });
      },
      err => console.error(err)
    );
    // Se actualiza el calendario
    this.updateCalendar();
  }

  ngOnInit(): void {
    // Se inicializan los elementos del calendario
    this.calendar = document.querySelector('.calendar')!;
    this.prevBtn = this.calendar.querySelector('.prev-month-btn')!;
    this.nextBtn = this.calendar.querySelector('.next-month-btn')!;
    this.monthTitle = this.calendar.querySelector('.calendar-month')!;
    this.grid = this.calendar.querySelector('.calendar-grid')!;

    this.asistencias = [];
    this.retardos = [];

    // Se hace una petición para obtener los check-in del empleado y se actualiza la lista 'pla'
    this.capyfit.getCheckEmployee(this.p['id']).subscribe(resp=>{;
      this.pla = resp;
      console.log(this.pla);
    },
    err => console.error(err)
    );

    // Se llama al método para actualizar el calendario
    this.updateCalendar();

    // Se agregan los escuchadores de eventos a los botones para navegar en el calendario
    this.prevBtn.addEventListener('click', () => {
      if (this.month === 0) {
        this.year--;
        this.month = 11;
      } else {
        this.month--;
      }
      this.updateCalendar();
    });

    this.nextBtn.addEventListener('click', () => {
      if (this.month === 11) {
        this.year++;
        this.month = 0;
      } else {
        this.month++;
      }
      this.updateCalendar();
    });

    // Se llama al método 'xd' para agregar los estilos del calendario
    this.xd();
  }

  /**
 * Actualiza el calendario con los días correspondientes al mes actual
 */
  private updateCalendar(): void {
    // Si el estado de la asistencia es 'Retardo', se agrega la fecha a la lista de retardos
    if(this.r.Estado==='Retardo'){
      if(!this.retardos.includes(this.r.Fecha)){
        this.retardos.push(this.r.Fecha);
      }
      console.log(this.retardos);
    }

    // Si el estado de la asistencia es 'Asistencia', se agrega la fecha a la lista de asistencias
    if(this.r.Estado==='Asistencia'){
      console.log("Hello");
      this.asistencias.push(this.r.Fecha);
      console.log(this.asistencias);
    }

    // Se obtienen el número de días en el mes actual y el día de la semana del primer día del mes
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    const firstDayOfMonth = new Date(this.year, this.month, 1).getDay();

    // Se actualiza el título del mes y año en el calendario
    this.monthTitle.textContent = new Date(this.year, this.month).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Se limpia la cuadrícula del calendario
    this.grid.innerHTML = '';

    // Se agregan los días en blanco antes del primer día del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
      const cell = document.createElement('div');
      cell.classList.add('calendar-day');
      cell.classList.add('non-day');
      this.grid.appendChild(cell);
    }

    // Se agregan los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      const cell = document.createElement('div');
      cell.classList.add('calendar-day');
      // Si el día actual es hoy, se agrega la clase 'today'
      if (i === this.today && this.year === this.date.getFullYear() && this.month === this.date.getMonth()) {
        cell.classList.add('today');
      }
      // Se crea la cadena de fecha en el formato dd-mm-yyyy
      let fechaCa = i + "-" + this.month + "-" + this.year;
      // Si la fecha actual está en la lista de asistencias, se agrega la clase 'green'
      if (this.asistencias.includes(fechaCa)) {
        cell.classList.add('green');
      }
      // Si la fecha actual está en la lista de retardos, se agrega la clase 'yellow'
      if (this.retardos.includes(fechaCa)) {
        cell.classList.add('yellow');
        console.log(fechaCa);
      }
      // Se agrega el número del día al contenido de la celda
      cell.textContent = i.toString();
      this.grid.appendChild(cell);
    }

    // Se obtienen todas las celdas del calendario
    const calendarDays = document.querySelectorAll('.calendar-day');

    // Se agrega un listener de click a cada celda del calendario
    calendarDays.forEach((day: Element) => {
      day.addEventListener('click', () => {
        let fecha: string = "";
        // Obtiene el texto del elemento de día del calendario seleccionado
        if(day.textContent){
          // Concatena el día, mes y año para formar la fecha seleccionada
          fecha = day.textContent + "-" + this.month + "-" + this.year;
          console.log("Fecha Seleccionada: " + fecha);
          // Realiza una llamada al método reviewCheckIn del servicio capyfit, que devuelve un observable
          this.capyfit.reviewCheckIn(this.emp.IdEmpleado, fecha).subscribe(res => {
            console.log(res);
            this.dataCalendar = res;
            let entry = document.getElementById('entry') as HTMLParagraphElement;
            // Si hay datos en la respuesta, actualiza la hora de entrada en la interfaz de usuario
            if(this.dataCalendar.length!=0){
              this.dataCalendar.forEach(c => {
                if(c.Tipo==='Entrada'){
                  entry.textContent = c.Hora;
                }
                console.log(c.Hora);
              });
            }else {
              // Si no hay datos en la respuesta, establece el texto en "Ningún día seleccionado"
              entry.textContent = "Ningún día seleccionado";
            }
          });
        }else {
          console.log("Fecha no válida");
        }
      });
    });
  }

  /*
  Esta función se encarga de crear un nuevo elemento de enlace HTML (link) y agregarlo al encabezado del documento 
  (la sección <head> del HTML) para cargar el archivo CSS de estilo de la plantilla de calendario.

  Es responsable de agregar dinámicamente la hoja de estilo de CSS del calendario a la página HTML en tiempo de ejecución, 
  para asegurarse de que el estilo esté disponible y sea aplicado correctamente cuando se muestre el calendario.
  */
  xd(): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../assets/css/calendar.css';
    document.head.appendChild(link);
  }

  loadChart(){
    this.updateCalendar();

    // Se obtiene el contexto del canvas en el HTML.
    const ctx = this.myChart.nativeElement.getContext('2d');

    // Se crea una nueva instancia del objeto Chart.
    const myChart = new Chart(ctx, {
      type: 'bar',// Tipo de gráfico que se quiere mostrar.
      data: {
      // Etiquetas que aparecerán en el eje X del gráfico.
      labels: ['Asistencias', 'Retardos '],
      // Datos que se van a representar en el gráfico.
        datasets: [{
          label: '',
          data: [this.asistencias.length, this.retardos.length],// Datos de asistencias y retardos obtenidos en la función updateCalendar.
          backgroundColor: [
            'rgba(8, 144, 0, 0.2)',// Color de fondo para el primer dato.
            'rgba(243, 156, 18, 0.2)',// Color de fondo para el segundo dato.
          ],
          borderColor: [
            'rgba(8, 144, 0, 1)',// Color del borde para el primer dato.
            'rgba(243, 156, 18, 1)',// Color del borde para el segundo dato.
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true// Se establece el valor mínimo del eje Y en cero.
          }
        },
        responsive: true,//// El gráfico se ajustará al tamaño de la ventana del navegador.
        plugins: {
          title: {
            display: true, // Se muestra el título del gráfico.
            text: 'Registro del Checkin' // Texto del título del gráfico.
          }
        }
      }
    });
  }
}