import React, {Component} from 'react'
import CartQuantityButton from './cart-quantity'
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Segment,
  Step,
  Table
} from 'semantic-ui-react'

const CartSingleProduct = props => {
  return (
    <div>
      <Item.Image
        size="small"
        src="https://media.istockphoto.com/photos/anzac-biscuit-isolated-clipping-path-picture-id183764572"
      />
      <Item.Content>
        <Item.Header as="a">{props.name}</Item.Header>
        <Item.Meta>
          <p>{props.brand}</p>
        </Item.Meta>
        <Item.Description>{props.description}</Item.Description>
        <Item.Extra>
          <CartQuantityButton />
          <Button.Group size="mini" floated="right" color="red">
            <Button>
              Remove
              <Icon name="chevron right" />
            </Button>
          </Button.Group>
        </Item.Extra>
      </Item.Content>
    </div>
  )
}
export default CartSingleProduct
