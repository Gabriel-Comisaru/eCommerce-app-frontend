import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:8080/auth/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  header: any;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const post = this.http.post<any>(
      AUTH_API + 'login' + `?username=${username}&password=${password}`, ''
    );
    return post;
  }

  setToken() {
    this.login('laur', 'laur').subscribe(res => {
      localStorage.setItem('authorization', `Bearer ${res.token}`)
    });
  }

  getHeader() {
    let header = new HttpHeaders()
        .set('Authorization', localStorage.getItem('authorization') ?? '')
        .set('Accept', '*/*')
        .set('Content-type', 'application/json');
    return {headers: header};
  }
}
