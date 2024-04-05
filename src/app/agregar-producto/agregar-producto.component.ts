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

  constructor(private service: ProductsService, private router: Router) {
    if (service.productToEdit != null) {
      this.onEdit = true;
      this.newProductForm.controls.nameProd.patchValue(service.productToEdit.nameProd);
      this.newProductForm.controls.desc.patchValue(service.productToEdit.description);
      this.newProductForm.controls.price.patchValue(service.productToEdit.price.toString());
    }
    else {
      this.onEdit = false;
      this.newProductForm.controls.nameProd.reset();
      this.newProductForm.controls.desc.reset();
      this.newProductForm.controls.price.reset();
    }
  }

  onEdit: boolean = false;


  newProductForm = new FormGroup({
    nameProd: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
    desc: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  })

  addProduct(fi: HTMLInputElement) {
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
