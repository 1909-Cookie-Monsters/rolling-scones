import React from 'react'
import {Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addProductThunkCreator, getCartThunkCreator} from '../store/cart'

class addToCartButton extends React.Component {
  constructor(props) {
    super(props)

    this.addToGuestCart = this.addToGuestCart.bind(this)
  }

  componentDidMount() {
    this.props.getOrderId()
  }

  addToGuestCart() {
    let products = []

    if (localStorage.getItem('guestCart')) {
      products = JSON.parse(localStorage.getItem('guestCart'))
    }
    products.push({productId: this.props.product.id})
    localStorage.setItem('guestCart', JSON.stringify(products))
  }

  render() {
    return (
      <div>
        {this.props.orderId ? (
          <Button
            onClick={() =>
              this.props.addToCart({
                orderId: this.props.orderId,
                productId: this.props.product.id,
                price: this.props.product.price
              })
            }
            icon
            labelPosition="left"
          >
            <Icon name="shopping cart" />
            Add To Cart
          </Button>
        ) : (
          <Button
            onClick={() => this.addToGuestCart()}
            icon
            labelPosition="left"
          >
            <Icon name="shopping cart" />
            Add To Cart
          </Button>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    orderId: state.cart.id
  }
}

const mapDispatach = dispatch => {
  return {
    addToCart: obj => dispatch(addProductThunkCreator(obj)),
    getOrderId: () => dispatch(getCartThunkCreator())
  }
}

export default connect(mapState, mapDispatach)(addToCartButton)
