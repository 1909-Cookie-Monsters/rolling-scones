import axios from 'axios'

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

export const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const initialState = []

export const getAllProductsThunkCreator = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getAllProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productsReducer
