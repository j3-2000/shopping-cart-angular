import { Injectable } from '@angular/core';
import  product from "product.json";


interface productI {  
  id: any;  
  name: string;  
  category: string;  
  description: string;  
  image : string;
  price : Number;
  spPrice? : Number;
  categories?: String[]
  managestock : boolean
}  

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {


products : productI[]= product.product

catt : string =''

 allCategories: any[] = [...new Set(this.products.flatMap((product) => product.categories))];

  getProductsByCategory = (category: any) => {
  return this.products.filter((product) => product.categories?.includes(category));
};
 getFirstProductImage = (category: any) => {
  const firstProduct = this.getProductsByCategory(category)[0];
  return firstProduct ? firstProduct.image : null;
};

}


