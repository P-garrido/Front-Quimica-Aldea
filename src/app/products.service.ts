import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { OrderProduct } from './models/order-product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  baseUrl = 'http://localhost:3000/products';
  cart: Array<OrderProduct> = [];

  getAll() {
    return this.http.get<Product[]>(this.baseUrl);
  }



  addToCart(prod: Product) {
    const orProd = new OrderProduct(prod, 1);
    this.cart.push(orProd);
    console.log(prod);
    console.log(this.cart);
  }


  removeProduct(ordProd: OrderProduct) {
    let index = this.cart.indexOf(ordProd);
    if (index != -1) {
      this.cart.splice(index, 1)
    }
  }
}
