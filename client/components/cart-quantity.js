import React from 'react'
import {Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addProductThunkCreator, getCartThunkCreator} from '../store/cart'

class ProductQty extends React.Component {
  componentDidMount() {
    this.props.getQuantity()
  }
  render() {
    return (
      <div>
        <Button.Group size="mini">
          <Button onClick>-</Button>
          <Button.Or text="20" />
          {/* text will be replace by cart item quantity */}
          <Button>+</Button>
        </Button.Group>
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
    updateQuantity: qty => dispatch(addProductThunkCreator(qty)),
    getQuantity: () => dispatch(getCartThunkCreator())
  }
}

export default connect(mapState, mapDispatach)(ProductQty)
