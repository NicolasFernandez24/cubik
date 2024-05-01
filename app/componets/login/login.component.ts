import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceLoginService } from '../../services/api-service-login.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  constructor(
    private apiService: ApiServiceLoginService,
    private authService: AuthenticationService,
    private router: Router,
    private el: ElementRef
  ) {}

  
  login() {
    this.apiService.login(this.correo, this.password).subscribe(
      response => {
        // Login exitoso
        const { access_token, refresh_token, user } = response;
        this.authService.setJwtToken(access_token);
        this.authService.setRefreshToken(refresh_token);
        this.authService.setUser(user);
        localStorage.setItem('userId', user.id);
        this.router.navigate(['/home']); 
      },
      error => {
        console.error('Error en el login', error);
        this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
      }
    );
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    const passwordInput = this.el.nativeElement.querySelector('#password');
    passwordInput.type = this.showPassword ? 'text' : 'password';
}
}

