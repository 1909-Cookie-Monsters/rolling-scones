import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunkCreator, updateSubtotal} from '../store/cart'
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
    this.props.getCartThunkCreator()
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
    console.log(`prop-------->`, this.props)

    return (
      <div>
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
