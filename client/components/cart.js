import React from 'react'
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
import CartQuantityButton from './cart-quantity'
import CheckoutButton from './checkout-button'

const style = {
  h1: {
    marginTop: '3em'
  },
  h2: {
    margin: '4em 0em 2em'
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em'
  },
  last: {
    marginBottom: '300px'
  }
}

const Cart = () => (
  <div>
    <Container text style={{marginTop: '7em'}}>
      <Container>
        <Item.Group divided>
          <Item>
            <Item.Image src="https://media.istockphoto.com/photos/anzac-biscuit-isolated-clipping-path-picture-id183764572" />
            <Item.Content>
              <Item.Header as="a">Delicious Cookie</Item.Header>
              <Item.Meta>
                <span>Date</span>
                <span>Category</span>
              </Item.Meta>
              <Item.Description>
                A description which may flow for several lines and give context
                to the content.
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
        </Item.Group>
      </Container>

      {/* <Header as='h3' content='Responsive Steps' style={style.h3} textAlign='center' />

    <Container style={style.last}>
      <Step.Group fluid>
        <Step icon='plane' title='Shipping' description='Choose your shipping options' />
        <Step active icon='dollar' title='Billing' description='Enter billing information' />
        <Step
          disabled
          icon='info circle'
          title='Confirm Order'
          description='Verify order details'
        />
      </Step.Group>
    </Container> */}
      <CheckoutButton />
    </Container>
  </div>
)

export default Cart
