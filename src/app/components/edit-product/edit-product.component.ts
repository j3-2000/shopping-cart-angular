import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/product.model';
import { Store } from '@ngrx/store';
import { updateProduct } from 'src/app/store/cart.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  selectedsize = '';
  selectedcolor = '';
  attributes: any = {};
  size: any = [];
  color: any = [];
  savedCart: Product[] = [];
  productsaved: any = '';
  cart: any[] = [];
  productDetails:Product[]=[]
  constructor( private store: Store, private routes: Router,) {}

  ngOnInit(): void {
    this.savedCart = JSON.parse(localStorage.getItem('cartProduct') || '[]');
    this.productsaved = JSON.parse(
      localStorage.getItem('selectedproduct') || ''
    );

    const selectedProduct = this.savedCart.find(
      (product) => product.id === this.productsaved
    );
    this.cart = this.savedCart;
    this.productDetails= this.savedCart
    if (selectedProduct) {
      this.attributes = selectedProduct.attributes;
      this.selectedcolor = selectedProduct.selectedColor;
      this.selectedsize = selectedProduct.selectedSize;
      this.size = this.attributes.size;
      this.color = this.attributes.color;
    }
  }

  onSelectColor(color: string) {
    this.selectedcolor = color;
  }

  onSelectSize(size: string) {
    this.selectedsize = size;
  }

  updateProductDetails(product: Product) {
    // Ensure that `product` object includes `selectedColor` and `selectedSize`
    const updatedProduct: Product = {
      ...product,
      selectedColor: this.selectedcolor,
      selectedSize: this.selectedsize,
    };

    this.store.dispatch(updateProduct({ product: updatedProduct }));

    const selectedProductIndex = this.savedCart.findIndex(
      (product) => product.id === this.productsaved
    );

    if (selectedProductIndex !== -1) {
      this.savedCart[selectedProductIndex].selectedColor = this.selectedcolor;
      this.savedCart[selectedProductIndex].selectedSize = this.selectedsize;
      this.routes.navigate(['../cart']);
      localStorage.setItem('cartProduct', JSON.stringify(this.savedCart));
    }
  
  }
}
