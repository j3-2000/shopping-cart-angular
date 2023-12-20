import { Component,HostListener,OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { selectCartProducts, selectCartTotalQuantity } from 'src/app/store/cart.selectors';

CartService
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartTotalQuantity$: Observable<number> | undefined;
  isCartVisible = false; 
  prdata$: Observable<any[]> | undefined;
  innerWidth: any;

  constructor(private store: Store) {}

      
  isShowDivIf = false;  
    
  toggleDisplayDivIf() {  
    this.isShowDivIf = !this.isShowDivIf;  
  }  
  ngOnInit() {
    this.innerWidth =window.innerWidth;

    console.log(innerWidth)
    this.cartTotalQuantity$ = this.store.pipe(select(selectCartTotalQuantity));
    this.prdata$ = this.store.pipe(select(selectCartProducts));

  }
  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }
  @HostListener('window:resize', ['$event'])  
  onResize(event:any) {  
    this.innerWidth = window.innerWidth;  
     
  }  
}
