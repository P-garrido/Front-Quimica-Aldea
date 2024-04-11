import { Component } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {


  constructor(private service: UsersService) {
    this.getAallUsers()
  }


  usuarios: User[] = [];


  getAallUsers() {
    this.usuarios.splice(0, this.usuarios.length);
    this.service.getAllUsers().subscribe(res => {
      res.forEach((us: any) => {
        this.usuarios.push(new User(us.idUser, us.nomUser, us.pass, us.address, us.mail, us.phone, us.type))
      })
    })
  }

  changeType(us: User) {
    this.service.changeType(us).subscribe(res => {
      if (res) {
        this.getAallUsers()
      }
    })
  }

  deleteUser(us: User) {
    this.service.deleteUser(us).subscribe(res => {
      if (res) {
        this.getAallUsers()
      }
    })
  }

}
