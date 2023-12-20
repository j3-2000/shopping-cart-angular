
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import {  ProductDisplayComponent } from '../components/product-display/product-display.component';
import { CartListComponent } from '../components/cart-list/cart-list.component';
import { SummaryComponent } from '../components/summary/summary.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { HomeComponent } from '../components/home/home.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';


export const AllComponents = [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    ProductListComponent,
    ProductDisplayComponent,
    CartListComponent,
    SummaryComponent,
    EditProductComponent,
    HomeComponent,
  
    AboutUsComponent,
   
  ]

  export const routes: Routes = [
    { path: 'category', component: CategoriesComponent },
    { path: 'products-list', component: ProductListComponent },
    { path: 'products-list/:category', component: ProductListComponent },
    { path: 'single-product', component: ProductDisplayComponent },
    { path: 'single-product/:id/:product', component: ProductDisplayComponent },
    { path: 'cart', component: CartListComponent },
    { path: 'summary', component: SummaryComponent },
    { path: 'editProduct/:id', component: EditProductComponent },
    { path: 'aboutus', component: AboutUsComponent },
    { path: '', component: HomeComponent },
  ];