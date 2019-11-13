import React from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {updateProductThunk} from '../store/cart'
import {retrieveGC} from '../store/guestcart'

class GuestQuantity extends React.Component {
  constructor() {
    super()
    this.updateQtyGC = this.updateQtyGC.bind(this)
  }

  updateQtyGC(sign, id) {
    let products = []

    if (localStorage.getItem('guestCart')) {
      products = JSON.parse(localStorage.getItem('guestCart'))
    }
    let index
    let counter = 0
    products.forEach((element, i) => {
      if (element.id === id) {
        counter++
        index = i
      }
    })

    if (sign === '-' && counter > 1) {
      products.splice(index, 1)
    } else if (sign === '+') {
      products.push(products[index])
    }

    localStorage.setItem('guestCart', JSON.stringify(products))
  }

  render() {
    return (
      <Button.Group size="mini">
        <Button
          onClick={() => {
            this.updateQtyGC('-', this.props.id)
            this.props.retrieveGC(JSON.parse(localStorage.getItem('guestCart')))
          }}
        >
          -
        </Button>
        <Button.Or text={this.props.qty} />
        <Button
          onClick={() => {
            this.updateQtyGC('+', this.props.id)
            this.props.retrieveGC(JSON.parse(localStorage.getItem('guestCart')))
          }}
        >
          +
        </Button>
      </Button.Group>
    )
  }
}

const getDispatch = dispatch => {
  return {
    updateProduct: obj => dispatch(updateProductThunk(obj)),
    retrieveGC: localStorage => dispatch(retrieveGC(localStorage))
  }
}

export default connect(null, getDispatch)(GuestQuantity)
