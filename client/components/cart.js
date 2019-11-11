import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunkCreator, updateSubtotal} from '../store/cart'
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
      guestCart: []
    }
    this.getGuestCart = this.getGuestCart.bind(this)
  }

  componentDidMount() {
    this.props.getCartThunkCreator()
    this.getGuestCart()
  }

  componentDidUpdate() {
    console.log('state ==>', this.state)
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

  render() {
    console.log('Trying to get user---->', this)

    return (
      <div>
        {this.props.cart.id ? (
          <Container text style={{marginTop: '7em'}}>
            <Container>
              <Item.Group divided>
                {this.props.cart.products &&
                this.props.cart.products.length > 0 ? (
                  this.props.cart.products.map(product => (
                    <Item key={product.id}>
                      <CartSingleProduct {...product} />
                    </Item>
                  ))
                ) : (
                  <div> You don't have any items in your cart, yet!</div>
                )}
              </Item.Group>
            </Container>
            <Container textAlign="right">
              Subtotal: ${this.props.subtotal.toFixed(2)}
            </Container>
            <CheckoutButton subtotal={this.props.subtotal} />
          </Container>
        ) : (
          <Container text style={{marginTop: '7em'}}>
            <Container>
              <Item.Group divided>
                {this.state.guestCart && this.state.guestCart > 0 ? (
                  this.props.cart.products.map(product => (
                    <Item key={product.id}>
                      <CartSingleProduct {...product} />
                    </Item>
                  ))
                ) : (
                  <div> its this one</div>
                )}
              </Item.Group>
            </Container>
            <Container textAlign="right">
              Subtotal: ${this.props.subtotal.toFixed(2)}
            </Container>
            <CheckoutButton subtotal={this.props.subtotal} />
          </Container>
        )}
      </div>
    )
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
