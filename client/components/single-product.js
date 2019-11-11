import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductsThunkCreator} from '../store/products'
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
  Icon
} from 'semantic-ui-react'

import AddToCart from './addToCart'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSingleProductsThunkCreator(Number(this.props.match.params.id))
  }

  render() {
    return (
      <div>
        <Container text style={{marginTop: '7em'}}>
          <h3>{this.props.product.name}</h3>
          <Image size="medium" src={this.props.product.imageUrl} />
          <h4>{this.props.product.description}</h4>
          <h4>Price: ${this.props.product.price}</h4>
          <AddToCart key={this.props.product.id} product={this.props.product} />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.singleProduct
})

const mapDispatchToProps = dispatch => ({
  getSingleProductsThunkCreator: id =>
    dispatch(getSingleProductsThunkCreator(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
