import React from 'react'
import {Link} from 'react-router-dom'

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

const SingleProductLink = props => {
  return (
    <div>
      <Container text style={{marginTop: '7em'}}>
        <Link to={`/products/${props.id}`}> {props.name} </Link>
        <Image size="small" src={props.imageUrl} />
      </Container>
    </div>
  )
}

export default SingleProductLink
