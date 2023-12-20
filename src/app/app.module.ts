import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryServiceService } from './services/category-service.service';
import { NgImageSliderModule } from 'ng-image-slider';
import { StoreModule, META_REDUCERS, ActionReducer } from '@ngrx/store';
import { cartReducer, productReducer } from './store/cart.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/Shared.module';
import { CommonModule } from '@angular/common';
import { AllComponents,routes } from './shared/Declarations';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

const localStorageSyncReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> =>
  localStorageSync({ keys: ['cart'], rehydrate: true })(reducer);

const localStorageSyncReducerproduct = (
  reducer: ActionReducer<any>
): ActionReducer<any> =>
  localStorageSync({ keys: ['product'], rehydrate: true })(reducer);

@NgModule({
  declarations: [
    AppComponent,
    ...AllComponents,
  ],
  imports: [

    FormsModule,
    CommonModule,
    NgImageSliderModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(
      { cart: cartReducer, product: productReducer },
      {
        metaReducers: [localStorageSyncReducer, localStorageSyncReducerproduct],
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
      ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: META_REDUCERS,
      useValue: localStorageSyncReducer,
      multi: true,
    },
    CategoryServiceService,
    {
      provide: META_REDUCERS,
      useValue: localStorageSyncReducerproduct,
      multi: true,
    }, provideAnimations(), // required animations providers
    provideToastr(), 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
