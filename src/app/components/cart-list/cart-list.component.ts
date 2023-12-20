import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartProducts, } from 'src/app/store/cart.selectors';
import * as CartActions from 'src/app/store/cart.actions';
import { Product } from 'src/app/product.model';
import { updateQuantity } from 'src/app/store/cart.actions';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  cartProducts$ = this.store.select(selectCartProducts);
  productid: any = '';
  cartProducts: any[] = [];
  total: number = 0;

  constructor(
    private store: Store,
    private cartservice: CartService,
    private route: ActivatedRoute,
    private routes: Router
  ) {}
  ngOnInit(): void {
    // this.store.select(selectCartProducts).subscribe((products) => {
    //   this.cartProducts = products;
    //   localStorage.setItem('cartProduct', JSON.stringify(this.cartProducts));
    // });

    this.store.select(selectCartProducts).subscribe((products) => {
      this.cartProducts = products.map((product: Product) => ({
        ...product,
        quantity: product.quantity || 1, 
      }));

      localStorage.setItem('cartProduct', JSON.stringify(this.cartProducts));
    });

    // const localProduct = JSON.parse(localStorage.getItem('cartProduct') || '[]');

    // localProduct.map((e: any) => {
    //   this.total += e.price;
    // });
    const localProduct = JSON.parse(
      localStorage.getItem('cartProduct') || '[]'
    );

    localProduct.map((e: any) => {
      this.total += e.price * e.quantity; 
    });
  }

  removeFromCart(productId: number): void {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
    window.location.reload();
  }

  increaseQuantity(product: Product): void {
    if (product.quantity !== undefined) {
      product.quantity++;
      this.updateQuantityInStore(product);
    }
  }

  private updateQuantityInStore(product: Product): void {
    this.store.dispatch(
      updateQuantity({ productId: product.id, quantity: product.quantity || 1 })
    );

    this.updateTotal();
  }

  decreaseQuantity(product: Product): void {

    if (product.quantity !== undefined && product.quantity > 1) {
      product.quantity--;
      this.updateQuantityInStore(product);
    }
 
    this.updateTotal();
  }

  updateTotal(): void {

    this.total = this.cartProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  }

  checkout(): void {
    const cartProducts = JSON.parse(
      localStorage.getItem('cartProduct') || '[]'
    );
    cartProducts.forEach((product: any) => {
      const matchingProduct = this.cartProducts.find(
        (p) => p.id === product.id  
      );
      if (matchingProduct) {
        product.quantity = matchingProduct.quantity;
      }
    });
    this.routes.navigate(['./summary']);

    console.log(cartProducts);
    localStorage.setItem('cartProduct', JSON.stringify(cartProducts));
    localStorage.setItem('totalcartvalue', JSON.stringify(this.total));
  }

  check() {
    if (this.total == 0) {
      return true;
    } else {
      return false;
    }
  }

  editpage(id:any) {
    this.routes.navigate(['../editProduct',id]);
    localStorage.setItem('selectedproduct',id)
  }
}
