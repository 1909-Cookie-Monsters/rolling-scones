import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import productsReducer from './products'
import cartReducer, {subTotalReducer} from './cart.js'
import guestCartReducer from './guestcart'

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  subtotal: subTotalReducer,
  guestCart: guestCartReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(rootReducer, middleware)

export default store
export * from './user'
