import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductsThunkCreator} from '../store/products'

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
        <h3>{this.props.product.name}</h3>
        <img src={this.props.product.imageUrl} />
        <h4>{this.props.product.description}</h4>
        <h4>Price: ${this.props.product.price}</h4>
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
