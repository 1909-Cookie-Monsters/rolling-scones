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
    <div className="singleProductLink">
      <Link to={`/products/${props.id}`} className="productTitle">
        {' '}
        {props.name}{' '}
      </Link>
      <Image
        size="small"
        src={props.imageUrl}
        className="singleProductPicture"
      />
    </div>
  )
}

export default SingleProductLink
