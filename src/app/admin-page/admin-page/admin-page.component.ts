import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  listName!:string;

  constructor(private router:Router, private route:ActivatedRoute) {
  }

  ngOnInit(){
    this.router.navigate(['admin'])
  }

  goToProducts(){
      this.router.navigate(['products'],{relativeTo:this.route})
  }

  goToOrders() {
    this.router.navigate(['orders'],{relativeTo:this.route})
  }
}
