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
      padding: '5em 0em',
      position: 'absolute',
      bottom: 0,
      width: '100%'
    }}
  >
    <Container textAlign="center">
      <Divider inverted section />
      <Image centered size="mini" src="../../public/smallLogo.png" />
      <List horizontal inverted divided link size="small">
        <List.Item as="a" href="#">
          Site Map
        </List.Item>
        <List.Item as="a" href="#">
          Contact Us
        </List.Item>
        <List.Item as="a" href="#">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="#">
          Privacy Policy
        </List.Item>
      </List>
    </Container>
  </Segment>
)

export default Footer
