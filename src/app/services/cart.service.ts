import { Component, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToCart } from '../store/cart.actions';
import { Product } from '../product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  durationInSeconds = 5;
  constructor(private store: Store, private _snackBar: MatSnackBar) {}

  addToCart(product: Product) {
    console.log('Adding to cart:', product);
    this.store.dispatch(addToCart({ product }));
    
  }
}
