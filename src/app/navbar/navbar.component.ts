import { Component } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  constructor(public loginService: LoginService) {

  }



}
