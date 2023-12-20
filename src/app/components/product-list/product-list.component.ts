import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Product } from 'src/app/product.model';
import { Store } from '@ngrx/store';
import { displayProduct } from 'src/app/store/cart.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  categoryProducts: any[] = [];
  categories: any[] = [];
  managestock: boolean | undefined;
  msg = '';
  constructor(
    private routes: Router,
    private list: CategoryServiceService,
    private pr: ProductServiceService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    let savedCategory = '';
    this.route.params.subscribe((params) => {
      savedCategory = params['category'];
    });

    if (savedCategory) {
      this.categoryProducts = this.list.products.filter((product) =>
        product.categories?.includes(savedCategory)
      );

      this.pr.category_product = this.categoryProducts;
    }

    console.log(this.categoryProducts);
    this.route.params.subscribe((params) => {
      params['category'];
    });
  }

  onclick(i: any, k: any) {
    let l = k.replace(/\s/g, ' ');
    this.routes.navigate(['../single-product', l]);
    this.pr.selectedProductId = i;
    this.route.params.subscribe((params) => {
      params['product'];
    });
  }

  selectProduct(i: any, k: any, selectedProduct: Product, stock: any): void {
    this.pr.stock = stock;
    this.store.dispatch(displayProduct({ selectedProduct }));
    // localStorage.setItem('proucts', JSON.stringify(this.categoryProducts));
    let l = k.replace(/\s/g, ' ');
    this.routes.navigate(['../single-product', i, l]);
    this.pr.selectedProductId = i;
    this.route.params.subscribe((params) => {
      params['product'];
    });
  }

  checkstocks() {
    if (this.pr.stock == true || this.pr.Quatityget == true) {
      return true;
    } else {
      return false;
    }
  }
}
