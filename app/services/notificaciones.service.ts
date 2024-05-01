import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion } from '../models/notificacion/notificacion.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private apiUrl = 'http://127.0.0.1:5000/notificaciones';

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

  getNotificacionesPorUsuario(idUsuario: number ): Observable<Notificacion[]> {
    const url = `${this.apiUrl}?id_usuario=${idUsuario}`; 
    const headers = this.getHeaders();
    return this.http.get<Notificacion[]>(url, { headers });
  }

  marcarNotificacionLeida(idNotificacion: number): Observable<any> {
    const url = `${this.apiUrl}?id=${idNotificacion}&estado=true`;
    const headers = this.getHeaders();
    return this.http.put(url, {}, { headers });
  }
}
