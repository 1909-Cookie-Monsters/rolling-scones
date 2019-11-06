import React from 'react'
import {Button} from 'semantic-ui-react'

const CartQuantityButton = () => (
  <Button.Group size="mini">
    <Button>-</Button>
    <Button.Or text="20" />
    {/* text will be replace by cart item quantity */}
    <Button>+</Button>
  </Button.Group>
)

export default CartQuantityButton
