import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginToken, User } from '../../types/user.type';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any>{
    const url: string = 'http://localhost:5001/users/signup';
    return this.http.post(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login';
    return this.http.post(url, {email, password});
  }

  activateToken(token : LoginToken): void{
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiry', new Date(Date.now() + token.expiresInSeconds * 1000).toISOString());
  }
}
