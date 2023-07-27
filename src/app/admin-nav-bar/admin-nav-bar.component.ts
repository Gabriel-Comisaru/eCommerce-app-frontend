import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent {

  username=localStorage.getItem('username');

  constructor(private authService:AuthService) {
  }

  ngOnInit(){
  }

logOut(){
  this.authService.logout()
}
}
