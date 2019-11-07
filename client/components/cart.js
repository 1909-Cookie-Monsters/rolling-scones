import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunkCreator} from '../store/cart'
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
  render() {
    console.log(this.props)

    return (
      <div>
        <Container text style={{marginTop: '7em'}}>
          <Container>
            <Item.Group divided>
              <ul>
                {this.props.cart.products &&
                  this.props.cart.products.map(product => (
                    <li key={product.id}>
                      <CartSingleProduct />
                    </li>
                  ))}
              </ul>
            </Item.Group>
          </Container>

          {/* <Header as='h3' content='Responsive Steps' style={style.h3} textAlign='center' />

    <Container style={style.last}>
      <Step.Group fluid>
        <Step icon='plane' title='Shipping' description='Choose your shipping options' />
        <Step active icon='dollar' title='Billing' description='Enter billing information' />
        <Step
          disabled
          icon='info circle'
          title='Confirm Order'
          description='Verify order details'
        />
      </Step.Group>
    </Container> */}
          <CheckoutButton />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCartThunkCreator: () => dispatch(getCartThunkCreator())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
