import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, Subject, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private apiBaseURL = 'http://localhost:8081/api';

  public loggedUser = new Subject();

  getLoggedUserObservable() {
    return this.loggedUser.asObservable();
  }

  getLoggedInUser(): Observable<User> {
    return this.http
      .get<User>(`${this.apiBaseURL}/users/loggedInUser`)
      .pipe(tap((res) => this.loggedUser.next(res)));
  }
}
