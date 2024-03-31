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

  constructor(private service: LoginService, private router: Router) { }




  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    adress: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  })


  register() {
    this.service.register(this.registerForm).subscribe(res => {
      this.service.token = res.token;
      this.service.setUserData(res.newUser);
      this.router.navigate(['/inicio']);

    })
  }

}
