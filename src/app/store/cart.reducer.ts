// import { createReducer, on } from '@ngrx/store';
// import { addToCart, removeFromCart } from './cart.actions';
// import { EntityState, createEntityAdapter } from '@ngrx/entity';
// import { Product } from '../product.model';

// export interface CartState extends EntityState<Product> {}

// export const cartAdapter = createEntityAdapter<Product>();
// export interface CartState {
//   products: Product[];
// }
// // export const initialCartState: CartState = cartAdapter.getInitialState({});
// export const initialCartState: CartState = {
//   products: [],
//   ids: [],
//   entities: {},
// };

// export const cartReducer = createReducer(
//   initialCartState,
//   on(addToCart, (state, { product }) => {
//     return { ...state, products: [...state.products, product] };

//   }),
//   on(removeFromCart, (state, { productId }) => {
//     return {
//       ...state,
//       products: state.products.filter((product) => product.id !== productId),
//     };
//   }),

// );
import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  displayProduct,
  removeFromCart,
updateProduct
} from './cart.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../product.model';

export interface CartState extends EntityState<Product> {
  totalQuantity: number;
}
//
export const productAdapter = createEntityAdapter<Product>();
export interface ProductState {
  selectedProduct: Product | null;
  // other state properties if needed
}

export const initialState: ProductState = {
  selectedProduct: null,
  // other initial state properties if needed
};
//

export const cartAdapter = createEntityAdapter<Product>();
export const initialCartState: CartState = cartAdapter.getInitialState({
  totalQuantity: 0,
});

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { product }) => {
    const existingProduct = state.entities[product.id];

    if (existingProduct) {
      return cartAdapter.updateOne(
        {
          id: product.id,
          changes: {
            quantity: existingProduct.quantity + 1,
            Quantity: existingProduct.Quantity - 1,
          },
        },
        state
      );
    } else {
      return cartAdapter.addOne(
        { ...product, quantity: 1, Quantity: product.Quantity - 1 },
        { ...state, totalQuantity: state.totalQuantity + 1 }
      );
    }
  }),
  on(removeFromCart, (state, { productId }) => {
    return cartAdapter.removeOne(productId, {
      ...state,
      totalQuantity: state.totalQuantity - 1,
    });
  }),

  // Handle updateProduct action
  on(updateProduct, (state, { product }) => {
    // Update the selectedColor and selectedSize fields
    return cartAdapter.updateOne(
      {
        id: product.id,
        changes: {
          selectedColor: product.selectedColor,
          selectedSize: product.selectedSize,
        },
      },
      state
    );
  })
    
);



export const productReducer = createReducer(
  initialState,  on(displayProduct, (state, { selectedProduct }) => {
    return{
      ...state,
      selectedProduct: selectedProduct,
    };
  })
  
  )