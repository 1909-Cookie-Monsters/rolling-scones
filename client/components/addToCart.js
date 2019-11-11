import React from 'react'
import {Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addProductThunkCreator, getCartThunkCreator} from '../store/cart'

class addToCartButton extends React.Component {
  componentDidMount() {
    this.props.getOrderId()
  }

  render() {
    return (
      <div>
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
