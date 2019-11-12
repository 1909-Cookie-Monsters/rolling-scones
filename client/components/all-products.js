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
      <div id="allproducts">
        {this.props.products.map(product => (
          <div key={product.id} id="singleproduct">
            <SingleProductLink {...product} />
            <Item>Price: ${product.price}</Item>
            <AddToCart key={product.id} product={product} />
          </div>
        ))}
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

// return (
//   <div id = "allproducts">
//     <Container text style={{marginTop: '7em'}}>
//       <Item.Group id="allproducts">
//         <Grid columns={3} stackable>
//           {this.props.products.map(product => (
//             <Grid.Column key={product.id}>
//               <Item>
//                 <Container id="singleproduct">
//                   <SingleProductLink {...product} />
//                   <Item.Extra>Price: ${product.price}</Item.Extra>
//                   <AddToCart key={product.id} product={product} />
//                 </Container>
//               </Item>
//             </Grid.Column>
//           ))}
//         </Grid>
//       </Item.Group>
//     </Container>
//   </div>
// )
