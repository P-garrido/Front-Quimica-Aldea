import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent {

  constructor(private service: ProductsService, private router: Router) { }


  newProductForm = new FormGroup({
    nameProd: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    desc: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  })

  // FALTA VER COMO SUBIR IMAGEM
  addProduct(fi: HTMLInputElement) {
    console.log(this.newProductForm)
    const formData = new FormData();
    let file = fi.files![0];
    formData.append('file', file);
    console.log(file)
    console.log(formData)

    // this.service.addProduct(this.newProductForm).subscribe(res => {
    //   if (res) {
    //     console.log(res)
    //     this.router.navigate(['productos']);
    //   }
    // })
  }

}
