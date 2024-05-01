import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Sala } from '../models/sala/sala.model';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceSalaService {

  
  private apiUrl = 'http://127.0.0.1:5000/salas';

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
  getAllSalas(): Observable<Sala[]> {
    const url = `${this.apiUrl}/all`; // Endpoint para obtener todas las salas
    const headers = this.getHeaders();
    return this.http.get<Sala[]>(url, { headers });
  }

  getSalaById(salaId: number): Observable<Sala> {
    const url = `${this.apiUrl}/${salaId}`; // Endpoint para obtener una sala por su ID
    const headers = this.getHeaders();
    return this.http.get<Sala>(url, { headers });
  }

  createSala(sala: Sala): Observable<any> {
    const url = this.apiUrl;
    const headers = this.getHeaders();

    return this.http.post(url, sala, { headers });
  }

  updateSala(salaId: number, sala: Sala): Observable<any> {
    const url = `${this.apiUrl}/${salaId}`;
    const headers = this.getHeaders();

    return this.http.put(url, sala, { headers });
  }

  deleteSala(salaId: number): Observable<any> {
    const url = `${this.apiUrl}/${salaId}`;
    const headers = this.getHeaders();

    return this.http.delete(url, { headers });
  }
}
