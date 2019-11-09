import React from 'react'
import CartQuantityButton from './cart-quantity'
import {connect} from 'react-redux'
import {removeProductThunk} from '../store/cart'
import {Link} from 'react-router-dom'

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
      <Container>
        <Item.Content>
          <Item.Header as={Link} to={`/products/${this.props.cart.productId}`}>
            {this.props.name}
          </Item.Header>
          <div>
            <Item.Image size="small" src={this.props.imageUrl} />
          </div>
          <Item.Extra>Price: ${this.props.price}</Item.Extra>
          <Item.Extra>
            <CartQuantityButton floated="left" product={this.props.cart} />{' '}
            <Button.Group size="mini" color="red">
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
            <Container textAlign="right">
              ${this.props.price * this.props.cart.qty}
            </Container>
          </Item.Extra>
        </Item.Content>
      </Container>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    removeItem: obj => dispatch(removeProductThunk(obj))
  }
}

export default connect(null, mapDispatch)(CartSingleProduct)
