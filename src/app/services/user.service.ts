import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BASE_URL_API} from "../settings";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }


  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL_API}/users/loggedInUser`);
  }


}
