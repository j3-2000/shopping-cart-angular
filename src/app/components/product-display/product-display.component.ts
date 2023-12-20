import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/product.model';
import { Store, select } from '@ngrx/store';
import {
  getSelectedProduct,
  selectCartProducts,
} from 'src/app/store/cart.selectors';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  imageObject: any[] = [];
  attribute: any = {};
  size1: any = [];
  color: any = [];
  selectedSize: string = '';
  selectedColor: string = '';
  quantity: number = 1;
  msg: String = 'Out of Stock 😞';
  productDetails: Product[] = [];
  cart1: any[] = [];
  cart: any[] = [];
  Quantity: number = 0;
  manageStock: boolean | undefined;
  cat = [];
  cartProducts$: Observable<Product[]> = this.store.select(selectCartProducts);

  selectedProduct$: Observable<Product | null> = this.store.pipe(
    select(getSelectedProduct) // Use the selector
  );
  Object = Object;
  constructor(
    private newlist: ProductServiceService,
    private cartService: CartService,
    private store: Store,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let savedId = '';
    this.route.params.subscribe((params) => {
      savedId = params['id'];
    });

    this.selectedProduct$.subscribe((selectedProduct) => {
      if (selectedProduct) {

      }
    });

    const data = this.newlist.products;

    if (savedId) {
      this.cart1 = data.filter((product) => product.id == savedId);
    }

    window.localStorage.setItem('pr', JSON.stringify(this.cart1));
    this.cart = JSON.parse(localStorage.getItem('pr') || '[]');

    this.cart.forEach((key) => {
      this.imageObject = key.imagearr;
      this.Quantity = key.Quantity;
    });

    this.cart.forEach((key) => {
      this.attribute = key.attributes;
    });

    this.size1 = this.attribute.size;
    this.color = this.attribute.color;

    this.cartProducts$.subscribe((cartProducts: Product[]) => {
      if (cartProducts.length > 0) {
        this.Quantity = cartProducts[0].Quantity;
      }
    });
  }

  addToCart(productDetails: Product) {
    this.cartService.addToCart({
      ...productDetails,
      selectedSize: this.selectedSize,
      selectedColor: this.selectedColor,
      quantity: this.quantity,
      // managestock: this.checkButton(),
    });
    this.toastr.success('Keep Shopping', 'Product Added Successfully');

  }
  onSelectSize(size: string) {
    this.selectedSize = size;
  }
  onSelectColor(color: string) {
    this.selectedColor = color;
  }



  checkButton() {
    if (this.newlist.stock == true) {  
      return !this.check()
    } else {

      return false;
    }
  }

  check(){
    if (this.Quantity <= 0) {
      this.newlist.Quatityget = false
      return false
    }else{
      this.newlist.Quatityget = true
      return true
    }
  }
}

// @Component({
//   selector: 'snack',
//   templateUrl: './snack.html',
//   styles: [
//     `
//       .example-pizza-party {
//         color: black;

//       }
//     `,
//   ],
// })
// export class PizzaPartyComponent {}
