import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @Output() fechaSeleccionada: EventEmitter<Date> = new EventEmitter<Date>();
  currentDate: Date = new Date();
  selectedDate: Date | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  prevMonth(): void {
    
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
  }

  nextMonth(): void {
   
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
  }

  getDaysInMonth(date: Date): Date[] {
    
    const daysInMonth: Date[] = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= days; i++) {
      daysInMonth.push(new Date(year, month, i));
    }

    return daysInMonth;
  }

  onSelectDate(date: Date): void {
    this.selectedDate = date;
    this.fechaSeleccionada.emit(date);
  }

}
