import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunkCreator} from '../store/products'
import {getCartThunkCreator} from '../store/cart'
import SingleProductLink from './single-product-link'

import AddToCart from './addToCart'

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Button,
  Icon,
  Item
} from 'semantic-ui-react'

class AllProducts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllProductsThunkCreator()
    this.props.getOrderId()
  }

  render() {
    //console.log('order.id', this.props.orderId)
    return (
      <div>
        <Container text style={{marginTop: '7em'}}>
          <Item.Group id="allproducts">
            {this.props.products.map(product => (
              <Item key={product.id}>
                <Container id="singleproduct">
                  <SingleProductLink {...product} />
                  <Item.Extra>Price: ${product.price}</Item.Extra>
                  <AddToCart key={product.id} product={product} />
                </Container>
              </Item>
            ))}
          </Item.Group>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.allProducts,
  orderId: state.cart.id
})

const mapDispatchToProps = dispatch => ({
  getAllProductsThunkCreator: () => dispatch(getAllProductsThunkCreator()),
  getOrderId: () => dispatch(getCartThunkCreator())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
