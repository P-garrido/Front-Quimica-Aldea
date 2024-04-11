import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/orders'

  getOrders() {
    return this.http.get<Order[]>(this.baseUrl);
  }

  changeStatus(ord: Order) {
    const url = `${this.baseUrl}/${ord.id}`;
    return this.http.patch(url, {
      date: ord.date,
      idUser: ord.user?.id,
      ammount: ord.ammount,
      address: ord.address,
      phone: ord.phone,
      name: ord.name,
      delivered: !ord.delivered
    })
  }


  deleteOrder(ord: Order) {
    const url = `${this.baseUrl}/${ord.id}`;
    return this.http.delete(url);
  }
}
