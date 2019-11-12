import React from 'react'
import CartQuantityButton from './cart-quantity'
import {connect} from 'react-redux'
import {removeProductThunk} from '../store/cart'
import {Link} from 'react-router-dom'
import GuestQuantity from './guestQuantity'
import {removeItemGC} from '../store/guestcart'

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

  removefromlocal(id) {
    let products = []

    if (localStorage.getItem('guestCart')) {
      products = JSON.parse(localStorage.getItem('guestCart'))
    }
    let newProducts = products.filter(element => element.id !== id)

    localStorage.setItem('guestCart', JSON.stringify(newProducts))
  }

  render() {
    console.log(`single item cart props`, this.props)
    return (
      <Container>
        {this.props.user.id ? (
          <Item.Content>
            <Item.Header
              as={Link}
              to={`/products/${this.props.cart.productId}`}
            >
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
                ${this.props.subsubtotal.toFixed(2)}
              </Container>
            </Item.Extra>
          </Item.Content>
        ) : (
          <Item.Content>
            <Item.Header as={Link} to={`/products/${this.props.id}`}>
              {this.props.name}
            </Item.Header>
            <div>
              <Item.Image size="small" src={this.props.imageUrl} />
            </div>
            <Item.Extra>Price: ${this.props.price}</Item.Extra>
            <Item.Extra>
              <GuestQuantity floated="left" {...this.props} />{' '}
              <Button.Group size="mini" color="red">
                <Button
                  onClick={() => {
                    this.removefromlocal(this.props.id)
                    this.props.removeItemGC(this.props.id)
                  }}
                >
                  Remove
                  <Icon name="chevron right" />
                </Button>
              </Button.Group>
              <Container textAlign="right">
                ${this.props.subsubtotal.toFixed(2)}
              </Container>
            </Item.Extra>
          </Item.Content>
        )}
      </Container>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    removeItem: obj => dispatch(removeProductThunk(obj)),
    removeItemGC: id => dispatch(removeItemGC(id))
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(CartSingleProduct)
