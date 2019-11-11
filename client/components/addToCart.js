import React from 'react'
import {Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addProductThunkCreator, getCartThunkCreator} from '../store/cart'

class addToCartButton extends React.Component {
  constructor(props) {
    super(props)

    this.addToGuestCart = this.addToGuestCart.bind(this)
    this.products = {}
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

    //let id = this.props.product.id

    // if (localStorage.getItem('guestCart')) {
    //   products = JSON.parse(localStorage.getItem('guestCart'))
    // }
    // // products.push({productId: this.props.product.id})
    // if (id in products) {
    //   products = {...products, id: id+1}
    // }
    // else {
    //   products = {...products, id: 1}
    // }

    // localStorage.setItem('guestCart', JSON.stringify(products))

    // let id = this.props.product.id

    // if (id in this.products) {
    //   this.products[id] = this.products[id] + 1
    // } else {
    //   this.products[id] = 1
    // }
    // console.log('products -->', this.products)

    // if (localStorage.getItem('guestCart')) {
    //   products = JSON.parse(localStorage.getItem('guestCart'))
    // }
    // products.forEach(product => {

    // })

    // for (let i = 0; i < products.length; i++) {
    //   let product = products[i]
    //   if (product.productId === this.props.product.id) {
    //     product.qty ++
    //     break
    //   }
    //   if (i === products.length - 1) {
    //     products.push(
    //       {productId: this.props.product.id,
    //        qty: 1}
    //     )
    //   }
    // }
    //let id = this.props.product.id
    //console.log('id -->', id)

    //   if (products.length === 0) {
    //     products.push(
    //       {
    //         productId: id,
    //         qty: 1
    //       }
    //       )
    //       localStorage.setItem('guestCart', JSON.stringify(products))
    //   } else {
    //     for (let i = 0; i < products.length; i++) {
    //       let index = products[i]

    //       if(index.productId === id) {
    //         index.qty ++
    //       } else {
    //         products.push(
    //           {
    //             productId: id,
    //             qty: 1
    //           }
    //           )

    //       }
    //   }
    //   localStorage.setItem('guestCart', JSON.stringify(products))
    // }

    //localStorage.setItem('guestCart', JSON.stringify(products))
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
