import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { OrderProduct } from './models/order-product';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  baseUrl = 'http://localhost:3000/products';
  cart: Array<OrderProduct> = [];

  productToEdit: Product | null = null;

  getAll() {
    return this.http.get<Product[]>(this.baseUrl);
  }


  deleteProduct(prod: Product) {
    const url = `${this.baseUrl}/${prod.id}`
    return this.http.delete<any>(url)
  }



  addToCart(prod: Product) {
    const orProd = new OrderProduct(prod, 1);
    this.cart.push(orProd);
  }


  removeProduct(ordProd: OrderProduct) {
    let index = this.cart.indexOf(ordProd);
    if (index != -1) {
      this.cart.splice(index, 1)
    }
  }


  addProduct(fd: FormData) {
    return this.http.post<Product>(this.baseUrl, fd)
  }



}
