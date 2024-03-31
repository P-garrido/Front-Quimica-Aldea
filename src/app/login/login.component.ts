import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private service: LoginService, private router: Router) { }


  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });


  getOneUser() {
    this.service.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
      if (res.token) {
        this.service.token = res.token;
        this.service.setUserData(res.user);
        this.router.navigate(['/inicio']);
      }
    })
  }

}
