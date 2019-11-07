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
    <Item>
      <Item.Image src="https://media.istockphoto.com/photos/anzac-biscuit-isolated-clipping-path-picture-id183764572" />
      <Item.Content>
        <Item.Header as="a">{props.name}</Item.Header>
        <Item.Meta>
          <span>Date</span>
          <span>Category</span>
        </Item.Meta>
        <Item.Description>
          A description which may flow for several lines and give context to the
          content.
        </Item.Description>
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
    </Item>
  )
}
export default CartSingleProduct
