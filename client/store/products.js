import axios from 'axios'

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

export const gotAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

export const gotSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

export const getAllProductsThunkCreator = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(gotAllProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getSingleProductsThunkCreator = id => {
  console.log(id)
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(gotSingleProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {
  allProducts: [],
  singleProduct: {}
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, allProducts: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}

export default productsReducer
