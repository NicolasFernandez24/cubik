import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sala } from '../models/sala/sala.model';
import { ApiServiceSalaService } from '../services/api-service-sala.service';

@Component({
  selector: 'app-modificar-sala',
  templateUrl: './modificar-sala.component.html',
  styleUrls: ['./modificar-sala.component.css']
})
export class ModificarSalaComponent implements OnInit {
  salaId!: number;
  sala: Sala = {
    nombre: '',
    cantidad: 0,
    precio: 0,
    habilitada: true
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salaService: ApiServiceSalaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id !== null) {
      this.salaId = +id;
      this.obtenerSala();
    } else {
      console.error('El parámetro "id" no está presente en la URL.');
    }
  }
  

  obtenerSala(): void {
    
    this.salaService.getSalaById(this.salaId).subscribe(
      sala => {
        this.sala = sala;
      },
      error => {
        console.error('Error al obtener la sala:', error);
      }
    );
  }

  guardarCambios(): void {
    console.log(this.sala)
    this.salaService.updateSala(this.salaId, this.sala).subscribe(
      response => {

        console.log('Sala modificada exitosamente:', response);
        this.router.navigate(['/modifica-sala']); // Redirige a la página principal después de la modificación
      },
      error => {
        console.error('Error al modificar la sala:', error);
      }
    );
  }

  cancelarModificacion(): void {
    this.router.navigate(['/modifica-sala']); // Redirige a la página principal si se cancela la modificación
  }
}
