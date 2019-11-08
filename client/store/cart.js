import axios from 'axios'

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const GET_ALL_PRODUCTS_IN_CART = 'GET_ALL_PRODUCTS_IN_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const UPDATE_PRODUCT_IN_CART = 'UPDATE_PRODUCT_IN_CART'

export const addedProduct = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
})

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

export const updateProductThunk = obj => {
  return async dispatch => {
    try {
      await axios.put('/api/cart', obj)
      dispatch(getCartThunkCreator())
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeProductThunk = obj => {
  return async dispatch => {
    try {
      await axios.delete('/api/cart', {data: obj})
      dispatch(getCartThunkCreator())
    } catch (error) {
      console.error(error)
    }
  }
}

export const addProductThunkCreator = obj => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart', obj)
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
    default:
      return state
  }
}

export default cartReducer
