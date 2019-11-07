import axios from 'axios'

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const GET_ALL_PRODUCTS_IN_CART = 'GET_ALL_PRODUCTS_IN_CART'

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
    case ADD_PRODUCT_TO_CART:
      return action.product
    case GET_ALL_PRODUCTS_IN_CART:
      return action.products
    default:
      return state
  }
}

export default cartReducer
