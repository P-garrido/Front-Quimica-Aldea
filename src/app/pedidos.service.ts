import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './models/order';
import { OrderProduct } from './models/order-product';

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


  createOrderWithoutUser(ord: Order) {
    return this.http.post(this.baseUrl, {
      date: ord.date,
      ammount: ord.ammount,
      address: ord.address,
      phone: ord.phone,
      mail: ord.mail,
      name: ord.name
    })
  }

  createOrderWithUser(ord: Order) {
    return this.http.post(this.baseUrl, {
      date: ord.date,
      ammount: ord.ammount,
      idUser: ord.user!.id
    })
  }

  createOrderProduct(op: OrderProduct, idOrd: number) {
    const url = 'http://localhost:3000/orderproducts'
    return this.http.post(url, {
      idOrder: idOrd,
      idProd: op.prod.id,
      quantity: op.quantity
    })
  }
}
