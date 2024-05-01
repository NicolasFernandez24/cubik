import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly jwtTokenKey = 'jwtToken';
  private readonly refreshTokenKey = 'refreshToken';
  private currentUser: any; 

  getJwtToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.jwtTokenKey);
    }
    return null;
  }

  setJwtToken(token: string): void {
    localStorage.setItem(this.jwtTokenKey, token);
  }

  clearJwtToken(): void {
    localStorage.removeItem(this.jwtTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  clearRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
  }

  isLoggedIn(): boolean {
    // Verificar si el usuario tiene un token de acceso
    return !!this.getJwtToken();
  }

  logout(): void {
    // Limpiar todos los datos de autenticación al cerrar sesión
    this.clearJwtToken();
    this.clearRefreshToken();
  }

  setUser(user: any): void {
    this.currentUser = user;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

 
  isAdmin(): boolean {
    
    return this.currentUser && this.currentUser.es_admin === true;
  }
  getUserId(): number | null {
    if (this.currentUser.id ) {
     
      return +this.currentUser.id; 
    } else {
      console.log('No hay ID de usuario.');
      return null; 
    }
  }
}


 
