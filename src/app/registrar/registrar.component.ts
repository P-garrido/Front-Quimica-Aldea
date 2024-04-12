import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {

  constructor(public service: LoginService, private router: Router) {
    if (service.user != null) {
      this.registerForm.controls.username.patchValue(service.user.username);
      this.registerForm.controls.password.patchValue(service.user.password);
      this.registerForm.controls.mail.patchValue(service.user.mail);
      this.registerForm.controls.address.patchValue(service.user.address);
      this.registerForm.controls.phone.patchValue(service.user.phone);
      console.log(service.user)
    }
    else {
      this.registerForm.controls.username.reset();
      this.registerForm.controls.password.reset();
      this.registerForm.controls.mail.reset();
      this.registerForm.controls.address.reset();
      this.registerForm.controls.phone.reset();
    }
  }


  //ARREGLAR PROBLEMA DE QUE NO SE VERIFICA SI HAY UN USUARIO REGISTRADO O NO
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  })


  register() {
    this.service.register(this.registerForm).subscribe(res => {
      this.service.token = res.token;
      this.service.setUserData(res);
      this.router.navigate(['/inicio']);

    })
  }

}
