export class Calendar {
    private calendar!: HTMLElement;
    private prevBtn!: HTMLElement;
    private nextBtn!: HTMLElement;
    private monthTitle!: HTMLElement;
    private grid!: HTMLElement;
  
    private date = new Date();
    private year = this.date.getFullYear();
    private month = this.date.getMonth();
    private today = this.date.getDate();
    private asistencias = ["13-2-2023","2-2-2023","1-1-2023"];
    private faltas = ["17-2-2023","3-2-2023","1-1-2022"];
    private retardos = ["15-2-2023","8-2-2023"];
  
    constructor() {}
  
    public init(): void {
      this.calendar = document.querySelector('.calendar')!;
      this.prevBtn = this.calendar.querySelector('.prev-month-btn')!;
      this.nextBtn = this.calendar.querySelector('.next-month-btn')!;
      this.monthTitle = this.calendar.querySelector('.calendar-month')!;
      this.grid = this.calendar.querySelector('.calendar-grid')!;
  
      this.updateCalendar();
  
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
        this.asistencias = ["13-2-2023","2-2-2023","1-1-2023"];
        this.faltas = ["17-2-2023","3-2-2023","1-1-2022"];
        this.retardos = ["15-2-2023","8-2-2023"];

        this.updateCalendar();
      });
    }
  
    private updateCalendar(): void {
      const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
      const firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
  
      this.monthTitle.textContent = new Date(this.year, this.month).toLocaleString('default', { month: 'long', year: 'numeric' });
  
      // Clear the grid
      this.grid.innerHTML = '';
  
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        const cell = document.createElement('div');
        cell.classList.add('calendar-day');
        this.grid.appendChild(cell);
      }
  
      // Add cells for each day of the month
      for (let i = 1; i <= daysInMonth; i++) {
        const cell = document.createElement('div');
        cell.classList.add('calendar-day');
        if (i === this.today && this.year === this.date.getFullYear() && this.month === this.date.getMonth()) {
          cell.classList.add('today');
        }
        let fechaCa = i + "-" + this.month + "-" + this.year;
        if (this.asistencias.includes(fechaCa)) {
           cell.classList.add('green');
        }
        if (this.faltas.includes(fechaCa)) {
           cell.classList.add('red');
        }
        if (this.retardos.includes(fechaCa)) {
           cell.classList.add('yellow');
        }
        cell.textContent = i.toString();
        this.grid.appendChild(cell);
      }

      const calendarDays = document.querySelectorAll('.calendar-day');

calendarDays.forEach((day: Element) => {
  day.addEventListener('click', () => {
    let fecha: string = "";
    if(day.textContent){
      fecha = day.textContent + "-" + this.month + "-" + this.year;
      console.log("Fecha Seleccionada: " + fecha);
    }else {
      console.log("Fecha no válida");
    }
    //Tanto en MongoDB y JS Los meses inician en 0
  });
});

    }
  }
  