import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EquipoService } from '../../services/api-service-equipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-equipos',
  templateUrl: './agregar-equipos.component.html',
  styleUrls: ['./agregar-equipos.component.css']
})
export class AgregarEquipoComponent {
  nombre: string = '';
  precio: number = 0;
  habilitada: boolean = false;
  imagenUrl: string | ArrayBuffer | null = null; // Variable para almacenar la URL de la imagen seleccionada

  successMessage: string = '';
  errorMessage: string = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private equipoService: EquipoService, private router: Router) { }

  agregarEquipo(form: NgForm): void {
    if (form.valid && this.imagenUrl) {
      // Ahora puedes enviar la imagenUrl en lugar de la imagen
      this.equipoService.agregarEquipo(this.nombre, this.precio, this.habilitada, this.imagenUrl as string)
        .subscribe(
          response => {
            console.log('Equipo agregado exitosamente:', response);
            this.successMessage = 'Equipo agregado exitosamente';
            this.showSuccessMessage = true;
            form.reset(); // Resetear el formulario después de agregar el equipo
            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 5000); // Ocultar el mensaje después de 5 segundos
          },
          error => {
            console.error('Error al agregar equipo:', error);
            this.errorMessage = 'Error al agregar equipo. Por favor, inténtalo de nuevo.';
            this.showErrorMessage = true;
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 5000); // Ocultar el mensaje después de 5 segundos
          }
        );
    }
  }

  // Función para manejar el evento onChange del input de imagen
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
