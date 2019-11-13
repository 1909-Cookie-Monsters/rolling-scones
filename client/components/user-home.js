import React from 'react'
import {getCartThunkCreator} from '../store/cart'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from 'semantic-ui-react'

class FixedMenuLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getOrderId()
    }
  }

  render() {
    return (
      <div>
        <Container text style={{marginTop: '7em'}}>
          <Header as="h1">Welcome to The Rolling Scones Bakery</Header>
          <Image
            src="https://cdn.dribbble.com/users/2362961/screenshots/5526231/44therollingscones_1x.png"
            style={{marginTop: '2em'}}
          />
          <p>
            Established in 2019, The Rolling Scones is the hippest bakery in
            NYC!
          </p>
        </Container>
      </div>
    )
  }
}

// export default FixedMenuLayout

// /**
//  * CONTAINER
//  */
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getOrderId: () => dispatch(getCartThunkCreator())
  }
}

export default connect(mapState, mapDispatch)(FixedMenuLayout)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
