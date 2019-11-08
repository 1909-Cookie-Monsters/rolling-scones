import React, {Component} from 'react'
import CartQuantityButton from './cart-quantity'
import {connect} from 'react-redux'
import {removeProductThunk} from '../store/cart'

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

class CartSingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Item.Image
          size="small"
          src="https://media.istockphoto.com/photos/anzac-biscuit-isolated-clipping-path-picture-id183764572"
        />
        <Item.Content>
          <Item.Header as="a">{this.props.name}</Item.Header>
          <Item.Meta>
            <p>{this.props.brand}</p>
          </Item.Meta>
          <Item.Description>{this.props.description}</Item.Description>
          <Item.Extra>Price: ${this.props.price}</Item.Extra>
          <Item.Extra>
            <CartQuantityButton product={this.props.cart} />
            <Button.Group size="mini" floated="right" color="red">
              <Button
                onClick={() =>
                  this.props.removeItem({
                    orderId: this.props.cart.orderId,
                    productId: this.props.cart.productId
                  })
                }
              >
                Remove
                <Icon name="chevron right" />
              </Button>
            </Button.Group>
          </Item.Extra>
        </Item.Content>
      </div>
    )
  }
}

const mapState = state => {
  return {
    state
  }
}

const mapDispatch = dispatch => {
  return {
    removeItem: obj => dispatch(removeProductThunk(obj))
  }
}

export default connect(mapState, mapDispatch)(CartSingleProduct)
