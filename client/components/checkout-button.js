import React from 'react'
import {Button, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateProductThunk} from '../store/cart'

class CheckoutButton extends React.Component {
  render() {
    console.log('this is oredr to update', this.props.subtotal)
    return (
      <div>
        <Button
          attached="bottom"
          color="green"
          onClick={() =>
            this.props.subtotal &&
            this.props.updateProduct({
              checkedOut: this.props.cart.checkedOut,
              userId: this.props.cart.userId,
              totalPrice: this.props.subtotal
            })
          }
          as={Link}
          to="/order_completed"
        >
          {' '}
          Proceed to Checkout!
        </Button>
      </div>
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

export default connect(getState, getDispatch)(CheckoutButton)
