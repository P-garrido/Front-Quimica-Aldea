import { Component } from '@angular/core';
import { PedidosService } from '../pedidos.service';
import { Order } from '../models/order';
import { User } from '../models/user';
import { OrderProduct } from '../models/order-product';
import { Product } from '../models/product';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {

  constructor(private service: PedidosService) {
    this.getAllOrders()
  }


  pedidos: Order[] = [];

  getAllOrders() {
    this.pedidos.splice(0, this.pedidos.length);
    this.service.getOrders().subscribe(res => {
      res.forEach((ord: any) => {
        let user: User | null = null;
        if (ord.User) {
          user = new User(ord.User.idUser, ord.User.nomUser, ord.User.pass, ord.User.address, ord.User.mail, ord.User.phone, ord.User.type);
        }
        let ordProd: OrderProduct[] = [];
        ord.OrderProducts.forEach((op: any) => {
          ordProd.push(new OrderProduct(new Product(op.Product.idProd, op.Product.nameProd, op.Product.nameImg, op.Product.description, op.Product.price), op.quantity))
        })
        this.pedidos.push(new Order(ord.idOrder, ord.date, ord.ammount, user, ord.address, ord.mail, ord.phone, ord.name, ord.delivered, ordProd));
      })
    })
  }


  changeStatus(ord: Order) {
    this.service.changeStatus(ord).subscribe(res => {
      if (res) {
        this.getAllOrders()
      }
    })
  }


  deleteOrder(ord: Order) {
    this.service.deleteOrder(ord).subscribe(res => {
      if (res) {
        this.getAllOrders()
      }
    })
  }

}
