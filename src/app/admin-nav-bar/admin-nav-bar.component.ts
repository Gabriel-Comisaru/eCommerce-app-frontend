import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent {

  username='';

  constructor(private authService:AuthService,
              private userService:UserService) {
  }

  ngOnInit(){
    this.userService.getLoggedInUser()
      .subscribe(res=> {
        console.log(res)
        this.username = res.username!;
      })
  }

logOut(){
  this.authService.logout()
}
}
