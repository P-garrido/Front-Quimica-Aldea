import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    const storedData = sessionStorage.getItem(this.sessionStorageKey);
    this.user = storedData ? JSON.parse(storedData).data : User;
    this.token = storedData ? JSON.parse(storedData).token : String;
  }

  baseUrl = "http://localhost:3000/users";
  public sessionStorageKey = 'user_data';

  user: User;
  token: string;


  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrl, { username, password }).pipe(catchError(this.handleError));
  }


  setUserData(data: User) {
    this.user = data;
    // Almacenar datos en el almacenamiento local
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify({ data, token: this.token }));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      alert('Nombre de usuario o contrasena incorrectos');
    } else {
      console.error('Ocurrió un error inesperado:', error.message);
    }

    return throwError(() => new Error('Ocurrio un error'));
  }
}
