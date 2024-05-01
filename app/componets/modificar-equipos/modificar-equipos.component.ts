import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Equipo } from '../../models/equipo/equipo.model';
import { EquipoService } from '../../services/api-service-equipo.service';

@Component({
  selector: 'app-modificar-equipos',
  templateUrl: './modificar-equipos.component.html',
  styleUrls: ['./modificar-equipos.component.css']
})
export class ModificarEquipoComponent implements OnInit {
  equipoId!: number ;
  equipo: Equipo = {
    nombre: '',
    precio: 0,
    habilitada: true,
    imagen: '',
  };
  imagenUrl: string | ArrayBuffer | null = null;
  showSuccessMessage = false;
  showErrorMessage = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private equipoService: EquipoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
        this.equipoId = +id;
        this.obtenerEquipo();
      } else {
        console.error('El parámetro "id" no está presente en la URL.');
      }
    });
  }

  obtenerEquipo(): void {
    this.equipoService.getEquipoById(this.equipoId)
      .subscribe(
        equipo => {
          this.equipo = equipo;
        },
        error => {
          console.error('Error al obtener equipo:', error);
        }
      );
  }

  modificarEquipo(form: NgForm): void {
    if (form.valid) {
      const nombre = form.value.nombre;
      const precio = form.value.precio;
      const habilitado = form.value.habilitado;
      
      this.equipoService.actualizarEquipo(this.equipoId, nombre, precio, habilitado, this.imagenUrl as string)
        .subscribe(
          response => {
            console.log('Equipo modificado exitosamente:', response);
            this.showSuccessMessage = true;
            this.successMessage = 'Equipo modificado exitosamente.';
            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 5000); // Ocultar el mensaje después de 5 segundos
          },
          error => {
            console.error('Error al modificar equipo:', error);
            this.showErrorMessage = true;
            this.errorMessage = 'Error al modificar equipo. Por favor, inténtalo de nuevo.';
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 5000); // Ocultar el mensaje después de 5 segundos
          }
        );
    }
  }

  handleImagenInput(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenUrl = reader.result;
      };
      reader.readAsDataURL(fileList[0]);
    }
  }
}
