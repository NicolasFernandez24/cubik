import { Component, OnInit } from '@angular/core';
import { ApiServiceUsuariosService } from '../../services/api-service-usuarios.service';
import { Usuario } from '../../models/usuario/usuario.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  userId!: number;
  usuario: Usuario | null = null;
  isEditMode = false;
  editedValues: { [key: string]: string } = {};
  editedField: string | null = null;
  mostrarContrasenaActual = false;
  mostrarNuevaContrasena = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private usuarioService: ApiServiceUsuariosService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const userIdlo = localStorage.getItem('userId');
    if(userIdlo)
    this.userId=JSON.parse(userIdlo)
    this.obtenerUsuario();
   
  }

  obtenerUsuario(): void {
    this.usuarioService.obtenerUsuarioPorId(this.userId)
      .subscribe(
        (usuarioObtenido) => {
          this.usuario = usuarioObtenido;
          console.log(this.usuario)
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          this.errorMessage = 'Error al obtener el usuario. Por favor, inténtalo de nuevo.';
          this.clearMessagesAfterTimeout();
        }
      );
  }

  toggleEditMode(field: string | null): void {
    this.isEditMode = !this.isEditMode;
    this.editedField = field;
    this.editedValues = {}; 
    if (field && this.usuario) {
      this.editedValues[field] = String(this.usuario[field as keyof Usuario]) || '';
    }
  }

  modificarUsuario(): void {
    if (this.userId && this.usuario && this.editedField) {
      if (this.editedField === 'password') {
        // Verificar la contraseña actual utilizando el servicio
        const contrasenaActual = this.editedValues['contrasenaActual'];
        if (!contrasenaActual) {
          this.errorMessage = 'Por favor, ingresa tu contraseña actual.';
          this.clearMessagesAfterTimeout();
          return;
        }
        this.usuarioService.compararContrasenaActual(this.userId, contrasenaActual)
          .subscribe(
            (esCorrecta) => {
              if (!esCorrecta) {
                this.errorMessage = 'La contraseña actual no es correcta.';
                this.clearMessagesAfterTimeout();
                return;
              }
              // Continuar con la modificación de la contraseña
              this.continuarModificacion();
            },
            (error) => {
              console.error('Error al verificar la contraseña:', error);
              this.errorMessage = 'Error al verificar la contraseña. Por favor, inténtalo de nuevo.';
              this.clearMessagesAfterTimeout();
            }
          );
      } else {
        // Si no se está modificando la contraseña, continuar sin verificar la contraseña actual
        this.continuarModificacion();
      }
    } else {
      console.error('No se pudo obtener el ID del usuario o usuario.');
      this.errorMessage = 'Error al modificar el usuario. Inténtalo de nuevo más tarde.';
      this.clearMessagesAfterTimeout();
    }
  }

  continuarModificacion(): void {
    const valorEditado = this.editedValues[this.editedField || ''];
    if (this.validarValorEditado(valorEditado)) {
      const usuarioModificado: Usuario = {
        ...this.usuario!,
        [this.editedField!]: valorEditado
      };
      
      this.usuarioService.modificarUsuario(this.userId, usuarioModificado)
        .subscribe(
          (usuarioActualizado) => {
            console.log('Usuario modificado exitosamente:', usuarioActualizado);
            this.usuario = {
              ...this.usuario!,
              [this.editedField || '']: valorEditado
            };
            this.toggleEditMode(null);
            this.successMessage = '¡El cambio se realizó exitosamente!';
            this.clearMessagesAfterTimeout();
          },
          (error) => {
            console.error('Error al modificar usuario:', error.message || error);
            this.errorMessage = 'Error al modificar el usuario. Por favor, inténtalo de nuevo.';
            this.clearMessagesAfterTimeout();
          }
        );
    } else {
      this.errorMessage = 'El valor editado no es válido.';
      this.clearMessagesAfterTimeout();
    }
  }

  validarValorEditado(valor: string): boolean {
    switch (this.editedField) {
      case 'nombre':
      case 'apellido':
        return !/\d/.test(valor); // No debe contener números
      case 'telefono':
        return /^\d+$/.test(valor); // Debe contener solo números
      case 'correo':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor); // Debe tener formato de correo válido
      default:
        return true; // No hay validación especial para otros campos
    }
  }

  toggleMostrarContrasenaActual(): void {
    this.mostrarContrasenaActual = !this.mostrarContrasenaActual;
  }

  toggleMostrarNuevaContrasena(): void {
    this.mostrarNuevaContrasena = !this.mostrarNuevaContrasena;
  }
  clearMessagesAfterTimeout(): void {
    setTimeout(() => {
      this.errorMessage = null;
      this.successMessage = null;
    }, 5000); 
  }

}
