import React from 'react'
import {Link} from 'react-router-dom'

const SingleProductLink = props => {
  return (
    <div>
      <Link to={`/products/${props.id}`}> {props.name} </Link>
    </div>
  )
}

export default SingleProductLink
