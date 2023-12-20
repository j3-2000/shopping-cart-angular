import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import product from 'product.json';
import { Product } from '../product.model';
interface productI {
  id: any;
  name: string;
  category: string;
  description: string;
  image: string;
  price: Number;
  categories?: String[];
  managestock: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  category_product: any[] = [];
  stock: boolean | undefined;
  constructor(private store: Store) {
    console.log(this.products);
  }

  products: productI[] = product.product;

  selectedProductId: any | null = null;

  selectedProductName: any | null = null;
        
   Quatityget : any 
}
