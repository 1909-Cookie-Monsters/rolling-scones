import React from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {updateProductThunk} from '../store/cart'

class CartQuantityButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(`cartQty props:`, this.props)
    return (
      <Button.Group size="mini">
        <Button
          onClick={() =>
            this.props.updateProduct({
              orderId: this.props.cart.id,
              productId: this.props.product.productId,
              qty: this.props.product.qty - 1
            })
          }
        >
          -
        </Button>
        <Button.Or text={this.props.product.qty} />
        <Button
          onClick={() =>
            this.props.updateProduct({
              orderId: this.props.cart.id,
              productId: this.props.product.productId,
              qty: this.props.product.qty + 1
            })
          }
        >
          +
        </Button>
      </Button.Group>
    )
  }
}
const getState = state => {
  return {
    cart: state.cart
  }
}

const getDispatch = dispatch => {
  return {
    updateProduct: obj => dispatch(updateProductThunk(obj))
  }
}

export default connect(getState, getDispatch)(CartQuantityButton)
