import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private apiUrl = 'http://127.0.0.1:5000/pagos/mercadopago';
  private clientSecret = 'TEST-3955015753794320-022917-41fdfec09bba9ef7995288c34b59f4f4-1703964467';

  constructor(private http: HttpClient) { }

  realizarPago(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.clientSecret}`
    });
    
    return this.http.post<any>(this.apiUrl, paymentData, { headers });
  }
}
