import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://127.0.0.1:5000/pagos';

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
  getPagosPorReserva(reservaId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${reservaId}`;
    const headers = this.getHeaders();

    return this.http.get<any[]>(url, { headers });
  }
  agregarPago(idReserva: number, monto: number, fechaPago: string,monto_total:number): Observable<any> {
    const url = this.apiUrl;
    const headers = this.getHeaders();
    const body = { id_reserva: idReserva, monto:monto, fecha_pago: fechaPago ,monto_total:monto_total};

    return this.http.post(url, body, { headers });
  }

  eliminarPagosPorReserva(reservaId: number): Observable<any> {
    const url = `${this.apiUrl}/${reservaId}`;
    const headers = this.getHeaders();

    return this.http.delete(url, { headers });
  }
}
