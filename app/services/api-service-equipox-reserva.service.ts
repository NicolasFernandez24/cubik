import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EquipoxReservaService {
  private apiUrl = 'http://127.0.0.1:5000/equipos_reserva';

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
  getEquiposPorReserva(reservaId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${reservaId}`;
    const headers = this.getHeaders();

    return this.http.get<any[]>(url, { headers });
  }

  asignarEquipoAReserva(idReserva: number, idEquipo: number): Observable<any> {
    const url = this.apiUrl;
    const headers = this.getHeaders();
    const body = { idreserva: idReserva, idequipo: idEquipo };

    return this.http.post(url, body, { headers });
  }

  eliminarEquipoxReservaPorReserva(idReserva: number): Observable<any> {
    const url = `${this.apiUrl}/${idReserva}`;
    const headers = this.getHeaders();

    return this.http.delete(url, { headers });
  }
  guardarEquiposPorReserva(idReserva: number, equiposSeleccionados: number[]): Observable<any> {
    const url = `${this.apiUrl}/batch`; 
    const headers = this.getHeaders();
    const body = {
      id_reserva: idReserva,
      equipos: equiposSeleccionados
    };

    return this.http.post(url, body, { headers });
  }
}
