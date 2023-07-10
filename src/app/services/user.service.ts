import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }


  private apiBaseURL = "http://localhost:8081/api";

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(`${this.apiBaseURL}/users/loggedInUser`);
  }


}
