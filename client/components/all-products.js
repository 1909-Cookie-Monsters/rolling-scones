import React from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunkCreator} from '../store/products'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllProductsThunkCreator()
  }

  render() {
    return (
      <div>
        <ul />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getAllProductsThunkCreator: () => dispatch(getAllProductsThunkCreator())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
