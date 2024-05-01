import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Usuario } from '../models/usuario/usuario.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceUsuariosService {
  private apiUrl = 'http://127.0.0.1:5000/usuarios';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      headers = headers.append('Authorization', `Bearer ${jwtToken}`);
    }

    return headers;
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    const url = this.apiUrl;
    const headers = this.getHeaders();
    return this.http.get<Usuario[]>(url, { headers });
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    const headers = this.getHeaders();
    return this.http.get<Usuario>(url, { headers })
      .pipe(
        tap(usuario => console.log('Usuario obtenido')),
        catchError(error => {
          console.error('Error al obtener el usuario:', error);
          throw error;
        })
      );
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    const url = this.apiUrl;
    const headers = this.getHeaders();
    return this.http.post<Usuario>(url, usuario, { headers });
  }

  modificarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    const headers = this.getHeaders();
    return this.http.put<Usuario>(url, usuario, { headers });
  }

  eliminarUsuario(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    const headers = this.getHeaders();
    return this.http.delete<void>(url, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  compararContrasenaActual(usuarioId: number, contrasenaActual: string): Observable<{ message: string }> {
    const url = `${this.apiUrl}/${usuarioId}/comparar-contrasena`;
    const headers = this.getHeaders();
    const body = { contrasena_actual: contrasenaActual };
    return this.http.post<{ message: string }>(url, body, { headers });
  }
}
