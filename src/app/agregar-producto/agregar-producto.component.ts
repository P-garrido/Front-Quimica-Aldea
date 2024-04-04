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
    file: new FormControl('', Validators.required),
    desc: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  })

  addProduct(fi: HTMLInputElement) {
    console.log(this.newProductForm)
    const formData = new FormData();
    formData.append('file', fi.files![0]);
    formData.append('nameProd', this.newProductForm.value.nameProd!);
    formData.append('description', this.newProductForm.value.desc ? this.newProductForm.value.desc : "");
    formData.append('price', this.newProductForm.value.price!);

    this.service.addProduct(formData).subscribe(res => {
      if (res) {
        this.router.navigate(['productos']);
      }
    })
  }

}
