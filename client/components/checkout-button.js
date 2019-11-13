import React from 'react'
import {Button, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateProductThunk} from '../store/cart'

class CheckoutButton extends React.Component {
  render() {
    return (
      <div>
        {this.props.subtotal !== 0 ? (
          <Button
            attached="bottom"
            color="green"
            onClick={
              this.props.cart.id
                ? () =>
                    this.props.updateProduct({
                      checkedOut: this.props.cart.checkedOut,
                      userId: this.props.cart.userId,
                      totalPrice: this.props.subtotal
                    })
                : () => localStorage.clear()
            }
            as={Link}
            to="/order_completed"
          >
            {' '}
            Proceed to Checkout!
          </Button>
        ) : (
          <Button attached="bottom" color="red">
            {' '}
            Please Add an Item to Cart to Checkout
          </Button>
        )}
      </div>
    )
  }
}
const getState = state => {
  return {
    cart: state.cart,
    guestCart: state.guestCart
  }
}

const getDispatch = dispatch => {
  return {
    updateProduct: obj => dispatch(updateProductThunk(obj))
  }
}

export default connect(getState, getDispatch)(CheckoutButton)
