import { Component, OnInit } from '@angular/core';
import { Sala } from '../models/sala/sala.model';
import { ApiServiceSalaService } from '../services/api-service-sala.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-modificar-sala',
  templateUrl: './crear-modificar-sala.component.html',
  styleUrls: ['./crear-modificar-sala.component.css']
})
export class CrearModificarSalaComponent implements OnInit {
  salas: Sala[] = [];
  salaSeleccionada: Sala | null = null;
  modoEdicion = false;

  constructor(private salaService: ApiServiceSalaService,private router :Router) { }

  ngOnInit(): void {
    this.obtenerSalas();
  }

  obtenerSalas(): void {
    this.salaService.getAllSalas().subscribe(
      salas => {
        this.salas = salas;
        this.asignarImagenes();
      },
      error => {
        console.error('Error al obtener las salas:', error);
      }
    );
  }
  asignarImagenes(): void {
    
    this.salas.forEach((sala) => {
      sala.imagen = this.obtenerImagenPorID(sala.id); 
    });
  }

  obtenerImagenPorID(id: number| undefined): string {
    if (id !== undefined) {
    switch (id) {
      case 1:
        return './assets/sala1_image1.jpg';
      case 2:
        return './assets/Maradona.jpg';
      case 3:
        return './assets/proda.jpg';
        case 4:
          return './assets/sala4_image2.jpg';
      default:
        return './assets/logokk3.png';
    }
     }
     else {
      
      return 'src/assets/logokk3.png';
  }
  }
  modificarSala(sala: Sala): void {
    this.salaSeleccionada = sala;
    this.modoEdicion = true;
    this.router.navigate(['/modificar-sala', sala.id]); 
  }

  cancelarEdicion(): void {
    this.salaSeleccionada = null;
    this.modoEdicion = false;
  }
 



}

