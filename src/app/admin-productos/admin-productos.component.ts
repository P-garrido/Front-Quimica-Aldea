import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.scss']
})
export class AdminProductosComponent {

  constructor(private service: ProductsService) {
    this.getAllProducts();
    service.productToEdit = null;
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



  deleteProduct(prod: Product) {
    this.service.deleteProduct(prod).subscribe(res => {
      console.log(res);
      if (res.status != 500) {
        this.getAllProducts()
      }
    })
  }


  editProduct(prod: Product) {
    this.service.productToEdit = prod;
  }

}
