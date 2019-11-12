import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

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

const Navbar = ({handleClick, isLoggedIn}) => (
  <Menu fixed="top" inverted>
    <Menu.Item as={Link} to="/home" header>
      <Image
        size="mini"
        src="https://cdn.dribbble.com/users/2362961/screenshots/5526231/44therollingscones_1x.png"
        style={{marginRight: '1.5em'}}
      />
      The Rolling Scones
    </Menu.Item>
    <Menu.Item as={Link} to="/home">
      Home
    </Menu.Item>
    <Menu.Item as={Link} to="/products">
      Products
    </Menu.Item>
    <Menu.Item>
      <Button as={Link} to="/cart" animated="vertical" compact={true}>
        <Button.Content hidden>My Cart</Button.Content>
        <Button.Content visible>
          <Icon name="shop" />
        </Button.Content>
      </Button>
    </Menu.Item>

    {isLoggedIn ? (
      <Menu.Item onClick={handleClick} as={Link} to="/home" position="right">
        Logout
      </Menu.Item>
    ) : (
      <Container className="loginButtons" position="right">
        <Menu.Item as={Link} to="/login" position="right">
          Login
        </Menu.Item>
        <Menu.Item as={Link} to="/signup" position="right" id="signupButton">
          Sign Up
        </Menu.Item>
      </Container>
    )}
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
