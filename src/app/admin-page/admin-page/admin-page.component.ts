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


  goToProducts(){
      this.router.navigate(['products'],{relativeTo:this.route})
  }
}
