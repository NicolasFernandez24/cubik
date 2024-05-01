import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  private apiUrl = 'http://127.0.0.1:5000/promociones';

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
  
  agregarPromocion( nombre?: string, descripcion?: string, tipo_descuento?: string, duracion_adicional?: number, descuento?: number,habilitada?:boolean): Observable<any> {
    const url = this.apiUrl;
    const headers = this.getHeaders();
    const body = { nombre, descripcion, tipo_descuento, duracion_adicional, descuento,habilitada };
    return this.http.post(url, body, { headers });
  }

  getAllPromciones(): Observable<any[]> {
    const url = `${this.apiUrl}/all`; 
    const headers = this.getHeaders();
    return this.http.get<any[]>(url, { headers });
  }
  getPromocion(promocionId: number): Observable<any> {
    const url = `${this.apiUrl}/${promocionId}`;
    const headers = this.getHeaders();

    return this.http.get(url, { headers });
  }

  actualizarPromocion(promocionId: number, nombre?: string, descripcion?: string, tipo_descuento?: string, duracion_adicional?: number, descuento?: number,habilitada?:boolean): Observable<any> {
    const url = `${this.apiUrl}/${promocionId}`;
    const headers = this.getHeaders();
    const body = { nombre, descripcion, tipo_descuento, duracion_adicional, descuento,habilitada };

    return this.http.put(url, body, { headers });
  }

  eliminarPromocion(promocionId: number): Observable<any> {
    const url = `${this.apiUrl}/${promocionId}`;
    const headers = this.getHeaders();

    return this.http.delete(url, { headers });
  }
}
