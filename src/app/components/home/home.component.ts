import { Component } from '@angular/core';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allproduct: any[] = [];
  breakpoint: any;


  constructor( private categoryservice:CategoryServiceService,private route: ActivatedRoute,private routes: Router,){

  }
   allProducts= this.categoryservice.products
   
getProductid(i: any, k: any){

    let l = k.replace(/\s/g, ' ');
    this.routes.navigate(['../single-product', i, l]);
    this.route.params.subscribe((params) => {
      params['product'];
    });
  }

  
}


