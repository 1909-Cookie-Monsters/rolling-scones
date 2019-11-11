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
          <Item.Group id="allproducts">
            <Grid columns={3} stackable>
              {this.props.products.map(product => (
                <Grid.Column key={product.id}>
                  <Item>
                    <Container id="singleproduct">
                      <SingleProductLink {...product} />
                      <Item.Extra>Price: ${product.price}</Item.Extra>
                      <AddToCart key={product.id} product={product} />
                    </Container>
                  </Item>
                </Grid.Column>
              ))}
            </Grid>
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
