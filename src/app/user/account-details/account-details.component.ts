import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit{
  loggedInUser: User = JSON.parse(
    localStorage.getItem('currentUser') || '{}'
  );

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getLoggedUserObservable().subscribe((res) => {
      this.loggedInUser = res;
    });
  }
}
