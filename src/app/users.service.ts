import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private loginService: LoginService) { }


  baseUrl: string = 'http://localhost:3000/users';


  getAllUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  changeType(us: User) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${us.id}`;
    return this.http.patch(url, {
      username: us.username,
      pass: us.password,
      address: us.address,
      phone: us.phone,
      mail: us.mail,
      type: !us.type
    }, { headers })
  }

  deleteUser(us: User) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${us.id}`;
    return this.http.delete(url, { headers });
  }
}
