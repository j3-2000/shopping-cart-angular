import { createAction, props } from '@ngrx/store';
import { Product } from '../product.model'; // Make sure to have a product model defined

export const addToCart = createAction('[Cart] Add to Cart', props<{ product: Product }>());

export const removeFromCart = createAction(
    '[Cart] Remove from Cart',
    props<{ productId: number }>()
  );

  export const updateQuantity = createAction(
    '[Cart] Update Quantity',
    props<{ productId: number; quantity: number }>()
  );

  export const displayProduct = createAction('[product] Display Product', props<{ selectedProduct: Product}>());

  export const updateProduct = createAction(
    '[Cart] Update Product',
    props<{ product: Product }>()
  );