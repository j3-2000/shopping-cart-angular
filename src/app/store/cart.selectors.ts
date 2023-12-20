import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartAdapter, CartState, ProductState } from './cart.reducer';


//
export const getProductState = createFeatureSelector<ProductState>('product');

//
export const selectCartState = createFeatureSelector<CartState>('cart');

const { selectAll } = cartAdapter.getSelectors();

export const selectCartProducts = createSelector(selectCartState, (state) =>
  selectAll(state)
);

export const selectCartTotalQuantity = createSelector(
  selectCartState,
  (state) => state.totalQuantity
);

export const getSelectedProduct = createSelector(
  getProductState,
  (state) => state.selectedProduct
);
