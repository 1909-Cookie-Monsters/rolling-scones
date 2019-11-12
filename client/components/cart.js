import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getCartThunkCreator} from '../store/cart'
import {updateSubtotal} from '../store/subtotal'
import CartSingleProduct from './cart-single-product'
import CheckoutButton from './checkout-button'
import guestCart from './guest-cart'

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Segment,
  Step,
  Table
} from 'semantic-ui-react'
import GuestCart from './guest-cart'

const style = {
  h1: {
    marginTop: '3em'
  },
  h2: {
    margin: '4em 0em 2em'
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em'
  },
  last: {
    marginBottom: '300px'
  }
}

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guestCart: [],
      retrievedItems: []
    }
    this.getGuestCart = this.getGuestCart.bind(this)
    this.getGuestCartItemsFromDb = this.getGuestCartItemsFromDb.bind(this)
    this.dbCall = this.dbCall.bind(this)
  }

  componentDidMount() {
    this.props.getCartThunkCreator()
    this.getGuestCart()
  }

  componentDidUpdate() {
    //console.log('state ==>', this.state)
    // let itemsAfterCall = this.getGuestCartItemsFromDb()[0]
    // this.setState({retrievedItems: itemsAfterCall})
    console.log('new State ==>', this.state)
    let subtotal = 0

    {
      this.props.cart.products &&
        this.props.cart.products.forEach(
          item => (subtotal += item.cart.qty * item.cart.price)
        )
    }
    if (subtotal >= 0) {
      this.props.updateSubtotal(subtotal)
    }
  }

  getGuestCart() {
    let localGuestCart = []
    if (localStorage.getItem('guestCart')) {
      localGuestCart.push(JSON.parse(localStorage.getItem('guestCart')))

      this.setState({
        guestCart: localGuestCart
      })
    }
    //console.log('local guest cart --->', localGuestCart)
  }

  getGuestCartItemsFromDb() {
    let guestCartItems = []
    let itemsOnState = this.state.guestCart
    //console.log('state -->', this.state)
    // console.log('itemsOnState ==>',itemsOnState)

    itemsOnState[0].forEach(item => {
      // console.log("item -->", item)
      let infoFromDb = this.dbCall(item.productId)
      guestCartItems.push(infoFromDb)
    })
    //console.log('array of retrieved data -->', guestCartItems)
    return guestCartItems
  }

  async dbCall(item) {
    try {
      let {data} = await axios.get(`/api/products/${item}`)
      //console.log('data -->', data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log('updated state -->', this.state)
    if (this.props.cart.id) {
      return (
        <div>
          <Container text style={{marginTop: '7em'}}>
            <Container>
              <Item.Group divided>
                {this.props.cart.products &&
                this.props.cart.products.length > 0 ? (
                  this.props.cart.products.map(product => {
                    return (
                      <Item key={product.id}>
                        <CartSingleProduct
                          subsubtotal={Number(
                            product.cart.price * product.cart.qty
                          )}
                          {...product}
                        />
                      </Item>
                    )
                  })
                ) : (
                  <div> You don't have any items in your cart, yet!</div>
                )}
              </Item.Group>
            </Container>
            <Container textAlign="right">
              Subtotal: ${this.props.subtotal}
            </Container>
            <CheckoutButton subtotal={this.props.subtotal} />
          </Container>
        </div>
      )
    } else {
      return (
        <div>
          <Container text style={{marginTop: '7em'}}>
            <Container>
              <Item.Group divided>
                {this.props.cart.products &&
                this.props.cart.products.length > 0 ? (
                  this.props.cart.products.map(product => {
                    return (
                      <Item key={product.id}>
                        <CartSingleProduct
                          subsubtotal={Number(
                            product.cart.price * product.cart.qty
                          )}
                          {...product}
                        />
                      </Item>
                    )
                  })
                ) : (
                  <div> this is guest cart</div>
                )}
              </Item.Group>
            </Container>
            <Container textAlign="right">
              Subtotal: ${this.props.subtotal.toFixed(2)}
            </Container>
            <CheckoutButton subtotal={this.props.subtotal} />
          </Container>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  subtotal: state.subtotal
})

const mapDispatchToProps = dispatch => ({
  getCartThunkCreator: () => dispatch(getCartThunkCreator()),
  updateSubtotal: subtotal => dispatch(updateSubtotal(subtotal))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
