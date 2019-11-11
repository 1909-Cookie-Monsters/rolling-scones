import React, {Component} from 'react'
import {connect} from 'react-redux'
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

const GuestCart = () => (
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
)

export default GuestCart
