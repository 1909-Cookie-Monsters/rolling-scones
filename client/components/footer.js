import React from 'react'

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

const Footer = () => (
  <Segment
    inverted
    vertical
    style={{
      margin: '5em 0em 0em',
      padding: '5em 0em'
    }}
  >
    <Container textAlign="right">
      <span>Copyright 2019 Rolling Scones Bakery LLC.</span>
    </Container>
  </Segment>
)

export default Footer
