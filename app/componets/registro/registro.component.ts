import { Component } from '@angular/core';
import { ApiServiceUsuariosService } from '../../services/api-service-usuarios.service';
import { Usuario } from '../../models/usuario/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nuevoUsuario: Usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    password: '',
    es_admin: false
  };
  
  confirmarCorreo: string = '';
  confirmarPassword: string = '';
  mostrarContrasena = false;
  mostrarConfirmarContrasena = false;
  registroExitoso = false;
  errorMessage = '';

  constructor(private usuarioService: ApiServiceUsuariosService,private router:Router) {}
  irAlLogin() {
    // Ajusta la ruta según la estructura de rutas de tu aplicación
    this.router.navigate(['/login']);
  }
  registrarUsuario() {
    // Verificación de nombre y apellido
   
   if(this.nuevoUsuario.nombre! && this.nuevoUsuario.apellido! && this.nuevoUsuario.correo! && this.nuevoUsuario.password!){ 
    if (this.contieneNumeros(this.nuevoUsuario.nombre) || this.contieneNumeros(this.nuevoUsuario.apellido)) {
      this.errorMessage = 'Error: El nombre y el apellido no pueden contener números.';
      return;
    }

    // Verificación de formato de correo electrónico
    if (!this.validateEmailFormat(this.nuevoUsuario.correo)) {
      this.errorMessage = 'Error: Formato de correo electrónico no válido.';
      return;
    }

    // Verificación de contraseña
    if (!this.validatePasswordFormat(this.nuevoUsuario.password)) {
      this.errorMessage = 'Error: La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.';
      return;
    }
    
  

    // Verificación de confirmación de contraseña
    if (this.nuevoUsuario.password !== this.confirmarPassword) {
      this.errorMessage = 'Error: Las contraseñas y la confirmación no coinciden.';
      return;
    }
     }

    // Registro de usuario
    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(
      response => {
        console.log('Usuario registrado exitosamente', response);
        this.registroExitoso = true;

      },
      error => {
        console.error('Error al registrar el usuario', error);
        this.errorMessage = 'Error al registrar el usuario. Por favor, inténtalo de nuevo.';
        this.registroExitoso = false;
       
      }
    );
  }

  // Funciones de verificación
  contieneNumeros(texto: string): boolean {
    return /\d/.test(texto);
  }

  validateEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePasswordFormat(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }
}