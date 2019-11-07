import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunkCreator} from '../store/products'
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
  Icon
} from 'semantic-ui-react'

class AllProducts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllProductsThunkCreator()
  }

  render() {
    return (
      <div>
        <Container text style={{marginTop: '7em'}}>
          <ul>
            {this.props.products.map(product => (
              <li key={product.id}>
                <SingleProductLink {...product} />
                <AddToCart key={product.id} />
              </li>
            ))}
          </ul>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.allProducts
})

const mapDispatchToProps = dispatch => ({
  getAllProductsThunkCreator: () => dispatch(getAllProductsThunkCreator())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
