import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo/equipo.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private apiUrl = 'http://127.0.0.1:5000/equipos';

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

 GetAllEquipos():Observable<Equipo[]> {
  const url = `${this.apiUrl}/all`; 
  const headers = this.getHeaders();
  return this.http.get<Equipo[]>(url, { headers });
}
getEquipoById(equipoId: number): Observable<Equipo> {
  const url = `${this.apiUrl}/${equipoId}`; 
  const headers = this.getHeaders();
  return this.http.get<Equipo>(url, { headers });
}

  agregarEquipo(nombre: string, precio: number, habilitada:boolean, imagen:string): Observable<any> {
    const url = this.apiUrl;
    const headers = this.getHeaders();
    const body = { nombre, precio,habilitada,imagen};

    return this.http.post(url, body, { headers });
  }

  actualizarEquipo(equipoId: number, nombre?: string, precio?: number, habilitada?:boolean,imagen?:string): Observable<any> {
    const url = `${this.apiUrl}/${equipoId}`;
    const headers = this.getHeaders();
    const body = { nombre, precio,habilitada,imagen };

    return this.http.put(url, body, { headers });
  }

  eliminarEquipo(equipoId: number): Observable<any> {
    const url = `${this.apiUrl}/${equipoId}`;
    const headers = this.getHeaders();

    return this.http.delete(url, { headers });
  }
}
