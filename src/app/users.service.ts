import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  baseUrl: string = 'http://localhost:3000/users';


  getAllUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  changeType(us: User) {
    const url = `${this.baseUrl}/${us.id}`;
    return this.http.patch(url, {
      nomUser: us.username,
      pass: us.password,
      address: us.address,
      phone: us.phone,
      mail: us.mail,
      type: !us.type
    })
  }

  deleteUser(us: User) {
    const url = `${this.baseUrl}/${us.id}`;
    return this.http.delete(url);
  }
}
