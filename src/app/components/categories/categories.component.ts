import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoriesList: any[] = [];
  categoryProducts: any[] = [];

  constructor(
    private routes: Router,
    public list: CategoryServiceService,
    private pr: ProductServiceService
  ) {}
  ngOnInit(): void {
    this.categoriesList = this.list.allCategories;
    this.categoryProducts = this.pr.category_product;
    
  }

  productshow(category: string) {
    // this.list.catt = category;
    this.routes.navigate(['../products-list', category]);
    this.categoryProducts.filter((product) =>
      product.categories!.includes(category)
    );
  }
}
