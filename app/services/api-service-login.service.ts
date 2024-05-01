import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Usuario } from '../models/usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceLoginService {

  private apiUrl = 'http://127.0.0.1:5000/login';

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
  login(correo: string, password: string): Observable<any> {
    const url = this.apiUrl;
    const headers = this.getHeaders();
    const body = { correo, password };
    
   

    return this.http.post(url, body, { headers });
  }

  refreshToken(): Observable<any> {
    const url = this.apiUrl
    const headers = this.getHeaders();

    return this.http.put(url, null, { headers });
  }


}

