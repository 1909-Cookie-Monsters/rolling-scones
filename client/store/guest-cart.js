//import axios from 'axios'

// export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
// export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'

// export const addedProductToCart = product => ({
//   type: ADD_PRODUCT_TO_CART,
//   product
// })

// export const removedProductFromCart = product => ({
//   type: REMOVE_PRODUCT_FROM_CART,
//   product
// })

// const initialState = []

// export const guestCartReducer = (state = initialState, action) => {
//   switch(action.type){
//     case ADD_PRODUCT_TO_CART:
//       return action.product
//     default:
//       return state
//   }
// }

import axios from 'axios'

export const GET_ALL_PRODUCTS_IN_CART = 'GET_ALL_PRODUCTS_IN_CART'

export const gotCart = products => {
  return {
    type: GET_ALL_PRODUCTS_IN_CART,
    products
  }
}
