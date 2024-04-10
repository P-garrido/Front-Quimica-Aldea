import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost/orders'

  getOrders() {
    return this.http.get<any>(this.baseUrl);
  }
}
