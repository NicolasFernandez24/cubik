import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://127.0.0.1:5000/reservas';

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
  getFechasDisponibles(idSala: number): Observable<string[]> {
    const url = `${this.apiUrl}/${idSala}/fechas-disponibles`;
    const headers = this.getHeaders();
    return this.http.get<string[]>(url, { headers });
  }

  getHorariosDisponibles(idSala: number, fecha: string): Observable<string[]> {
    const url = `${this.apiUrl}/${idSala}/horarios-disponibles/${fecha}`;
    const headers = this.getHeaders();
    return this.http.get<string[]>(url, { headers });
  }

  getAllReservas(): Observable<any[]> {
    let url = `${this.apiUrl}/all`; 
    const headers = this.getHeaders();
    return this.http.get<any[]>(url, { headers });
  }
  obtenerReserva(): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = this.getHeaders();

    return this.http.get(url, { headers });
  }

  agregarReserva(idUsuario: number, idSala: number, fecha: string, hora: string, duracion: number, alquilaEquipo: boolean,pagada:boolean, idPromocion?: number): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = this.getHeaders();
    const body = { id_usuario: idUsuario, id_sala: idSala, fecha, hora, duracion, alquila_equipo: alquilaEquipo, id_promocion: idPromocion,pagada };
    return this.http.post<{ id_reserva: number, message: string }>(url, body, { headers });
  }

  actualizarReserva(reserva_id: number,  fecha: string, hora: string): Observable<any> {
    const url = `${this.apiUrl}d/${reserva_id}`;
    const headers = this.getHeaders();
    const duracion=2;
    const body = { fecha, hora, duracion};

    return this.http.put(url, body, { headers });
  }

  eliminarReserva(reserva_id: number): Observable<any> {
    const url = `${this.apiUrl}d/${reserva_id}`;
    const headers = this.getHeaders();

    return this.http.delete(url, { headers });
  }

  marcarReservaComoPagada(idReserva: number): Observable<any> {
    const url = `${this.apiUrl}/${idReserva}/pagada`;
    const headers=this.getHeaders();
    return this.http.put(url, {headers});
  }
}
