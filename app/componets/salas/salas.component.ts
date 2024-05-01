import { Component } from '@angular/core';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent {
  salas: any[] = [
    { id: 1, nombre: 'Sala 24', x: 110, y: 460 }, 
    { id: 2, nombre: 'Sala 10', x: 370, y: 460 },
    { id: 3, nombre: 'Sala 6', x: 130, y: 230 },
    { id: 4, nombre: 'Sala 8', x: 310, y: 120 },
  ];
  logoOpacity: number = 0.8;
  onMouseOver() {
    // Aumentar la opacidad y escalar la imagen cuando el ratón pasa sobre ella
    this.logoOpacity = 1;
  }

  onMouseOut() {
    // Restablecer la opacidad y escala de la imagen cuando el ratón sale
    this.logoOpacity = 0.8;
  }

}