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
  Icon,
  Item
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
          <Item.Group>
            {this.props.products.map(product => (
              <Item key={product.id}>
                <Container>
                  <SingleProductLink {...product} />
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
  products: state.products.allProducts
})

const mapDispatchToProps = dispatch => ({
  getAllProductsThunkCreator: () => dispatch(getAllProductsThunkCreator())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
