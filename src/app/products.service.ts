import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { OrderProduct } from './models/order-product';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
    const storedData = sessionStorage.getItem(this.cartKey);
    this.cart = storedData ? JSON.parse(storedData).cart : []
  }


  baseUrl = 'http://localhost:3000/products';
  cart: Array<OrderProduct> = [];

  productToEdit: Product | null = null;

  cartKey = 'cart';


  setCartData() {
    // Almacenar datos en el almacenamiento local
    sessionStorage.setItem(this.cartKey, JSON.stringify({ cart: this.cart }));
  }

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
    this.setCartData();
  }


  removeProduct(ordProd: OrderProduct) {
    let index = this.cart.indexOf(ordProd);
    if (index != -1) {
      this.cart.splice(index, 1)
      this.setCartData()
    }
  }


  addProduct(fd: FormData) {
    return this.http.post<Product>(this.baseUrl, fd)
  }


  editProduct(fd: FormData) {
    const url = `${this.baseUrl}/${this.productToEdit!.id}`
    this.productToEdit = null;
    return this.http.patch(url, fd)
  }


  filter(filter: string) {
    const url = `${this.baseUrl}/${filter}`;
    return this.http.get<Product[]>(url);
  }






}
