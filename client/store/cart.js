import axios from 'axios'

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const GET_ALL_PRODUCTS_IN_CART = 'GET_ALL_PRODUCTS_IN_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const UPDATE_PRODUCT_IN_CART = 'UPDATE_PRODUCT_IN_CART'
export const UPDATE_SUBTOTAL = 'UPDATE_SUBTOTAL'

const CLEAR_CART = 'CLEAR_CART'

export const clearedCart = () => {
  return {
    type: CLEAR_CART
  }
}

export const addedProduct = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
})

export const updateSubtotal = subtotal => {
  return {
    type: UPDATE_SUBTOTAL,
    subtotal
  }
}

export const gotCart = products => {
  return {
    type: GET_ALL_PRODUCTS_IN_CART,
    products
  }
}

export const removeProduct = productId => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    productId
  }
}

export const updatedProduct = product => {
  return {
    type: UPDATE_PRODUCT_IN_CART,
    product
  }
}

export const updateProductThunk = orderDetails => {
  return async dispatch => {
    try {
      await axios.put('/api/cart', orderDetails)
      dispatch(updatedProduct(orderDetails))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeProductThunk = orderDetails => {
  return async dispatch => {
    try {
      await axios.delete('/api/cart', {data: orderDetails})
      dispatch(removeProduct(orderDetails.productId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addProductThunkCreator = orderDetails => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart', orderDetails)
      dispatch(addedProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getCartThunkCreator = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(gotCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_IN_CART:
      return action.products
    case REMOVE_PRODUCT_FROM_CART:
      let newState = state.products.filter(
        element => element.id !== action.productId
      )
      return {...state, products: newState}
    case UPDATE_PRODUCT_IN_CART:
      let updatedState = state.products.map(product => {
        if (product.cart.productId === action.product.productId) {
          product.cart.qty = action.product.qty
        }
        return product
      })
      return {...state, products: updatedState}
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

export const subTotalReducer = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_SUBTOTAL:
      return action.subtotal
    default:
      return state
  }
}

export default cartReducer
