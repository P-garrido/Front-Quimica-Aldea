import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {


  constructor(private service: ProductsService) {
    this.getAllProducts()
  }



  products: Array<Product> = [];

  getAllProducts() {
    this.products.splice(0, this.products.length);
    this.service.getAll().subscribe(response => {
      response.forEach((prod: any) => {
        this.products.push(new Product(prod.idProd, prod.nameProd, prod.urlImg, prod.description, prod.price))
      })
    })
  }

  addToCart(prod: Product) {
    this.service.addToCart(prod);
  }


  searchProd(sb: HTMLInputElement) {
    this.products.splice(0, this.products.length);
    this.service.filter(sb.value).subscribe(res => {
      res.forEach((prod: any) => {
        this.products.push(new Product(prod.idProd, prod.nameProd, prod.urlImg, prod.description, prod.price))
      })
    })
  }




}
