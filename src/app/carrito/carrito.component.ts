import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { OrderProduct } from '../models/order-product';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  constructor(private service: ProductsService) {
    this.getCart();
  }

  cart: Array<OrderProduct> = [];

  getCart() {
    this.cart = this.service.cart;
  }

  addAmmount(ordProd: OrderProduct) {
    ordProd.quantity++
  }

  subAmmount(ordProd: OrderProduct) {
    if (ordProd.quantity > 1) {
      ordProd.quantity--
    }
    else {
      this.service.removeProduct(ordProd);
      this.getCart();
    }
  }

}
