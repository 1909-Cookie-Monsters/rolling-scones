import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunkCreator, updateSubtotal} from '../store/cart'
import {retrieveGC} from '../store/guestcart'
import CartSingleProduct from './cart-single-product'
import CheckoutButton from './checkout-button'

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
  componentDidMount() {
    if (this.props.cart.id) {
      this.props.getCartThunkCreator()
    } else {
      this.props.retrieveGC(JSON.parse(localStorage.getItem('guestCart')))
    }
  }

  componentDidUpdate() {
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

  render() {
    console.log('this is comming from cart', this.props)
    return (
      <div>
        {this.props.cart.id ? (
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
              Subtotal: ${this.props.subtotal.toFixed(2)}
            </Container>
            <CheckoutButton subtotal={this.props.subtotal} />
          </Container>
        ) : (
          <Container text style={{marginTop: '7em'}}>
            <Container>
              <Item.Group divided>
                {this.props.guestCart && this.props.guestCart.length > 0 ? (
                  this.props.guestCart.map(product => {
                    return (
                      <Item key={product.id}>
                        <CartSingleProduct {...product} />
                      </Item>
                    )
                  })
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
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  subtotal: state.subtotal,
  state
})

const mapDispatchToProps = dispatch => ({
  getCartThunkCreator: () => dispatch(getCartThunkCreator()),
  updateSubtotal: subtotal => dispatch(updateSubtotal(subtotal)),
  retrieveGC: localStorage => dispatch(retrieveGC(localStorage))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
