import { Component,OnInit } from '@angular/core';
import { EquipoService } from '../../services/api-service-equipo.service';
import { Equipo } from '../../models/equipo/equipo.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar-equipos',
  templateUrl: './listar-equipos.component.html',
  styleUrl: './listar-equipos.component.css'
})
export class ListaEquiposComponent implements OnInit {
  equipos: Equipo[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private equipoService: EquipoService,private router:Router) { }

  ngOnInit(): void {
    this.obtenerEquipos();
  }

  obtenerEquipos(): void {
    this.equipoService.GetAllEquipos()
      .subscribe(
        equipos => {
          this.equipos = equipos;
        },
        error => {
          console.error('Error al obtener equipos:', error);
          this.errorMessage = 'Error al obtener equipos. Por favor, inténtalo de nuevo.';
        }
      );
  }

  modificarEquipo(equipo:Equipo){
    this.router.navigate(['/modificar-equipo', equipo.id]); 
  }
}