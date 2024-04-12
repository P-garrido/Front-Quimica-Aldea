import { Component, TemplateRef } from '@angular/core';
import { ProductsService } from '../products.service';
import { OrderProduct } from '../models/order-product';
import { LoginService } from '../login.service';
import { PedidosService } from '../pedidos.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models/order';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  constructor(private productService: ProductsService, private router: Router, private loginService: LoginService, private ordersService: PedidosService, private modalService: BsModalService) {
    this.getCart();
    this.getTotal();
  }

  total: number = 0;

  cart: Array<OrderProduct> = [];


  noUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email])
  })



  modalRef?: BsModalRef;

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }



  getCart() {
    this.cart.splice(0, this.cart.length);
    this.productService.cart.forEach((op: OrderProduct) => {
      this.cart.push(op);
    })
  }

  addAmmount(ordProd: OrderProduct) {
    ordProd.quantity++;
    this.getTotal();
  }

  subAmmount(ordProd: OrderProduct) {
    if (ordProd.quantity > 1) {
      ordProd.quantity--
    }
    else {
      this.productService.removeProduct(ordProd);
      this.getCart();
    }
    this.getTotal();
  }

  getTotal() {
    let tot = 0;
    this.cart.forEach((op: OrderProduct) => {
      tot += op.prod.price * op.quantity;
    });
    this.total = tot;
  }


  checkout(temp: TemplateRef<void>) {  //CHEQUEAR QUE FUNCIONE
    if (this.loginService.user!.id == undefined) {
      this.openModal(temp)
    }
    else {
      let ammount: number = 0;
      this.productService.cart.forEach((op: any) => {
        ammount += op.prod.price
      })
      const ord = new Order(null, Date(), ammount, this.loginService.user, null, null, null, null, false, []);
      this.ordersService.createOrderWithUser(ord).subscribe((res: any) => {
        if (res.idOrder) {
          this.productService.cart.forEach((op: OrderProduct) => {
            this.ordersService.createOrderProduct(op, res.idOrder).subscribe()
          })
        }
        alert("compra realizada");
        this.router.navigate([''])
      })
    }
  }

  confirm() {
    let ammount: number = 0;
    this.productService.cart.forEach((op: any) => {
      ammount += op.prod.price
    })
    const ord = new Order(null, Date(), ammount, null, this.noUserForm.value.address!, this.noUserForm.value.mail!, this.noUserForm.value.phone!, this.noUserForm.value.name!, false, [])
    this.ordersService.createOrderWithoutUser(ord).subscribe((res: any) => {
      if (res.idOrder) {
        this.productService.cart.forEach((op: OrderProduct) => {
          this.ordersService.createOrderProduct(op, res.idOrder).subscribe()
        })
      }
      this.modalRef?.hide();
      alert("compra realizada");
      this.router.navigate([''])
    })
  }

}
