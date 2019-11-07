const router = require('express').Router()
const {Cart, Order, Inventory} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    let shoppingCart = await Order.findOne({
      where: {
        userId: req.user.id,
        checkedOut: false
      },
      include: [
        {
          model: Inventory
        }
      ]
    })
    // if (shoppingCart === undefined) {
    //   const newOrder = await Order.create({userId: req.user.id})
    //   shoppingCart = newOrder
    // }
    res.json(shoppingCart)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const item = await Inventory.findByPk(req.body.productId)
    const [instance, wasCreated] = await Cart.findOrCreate({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId,
        // qty: req.body.qty,
        price: item.price
      }
    })

    if (wasCreated === false) {
      let updatedInstance = await instance.update({
        qty: instance.qty + 1
      })
      res.json(updatedInstance)
    } else {
      res.json(instance)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    let itemToUpdate = await Cart.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    let updatedItem = await itemToUpdate.update({
      qty: req.body.qty
    })
    res.json(updatedItem)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    let itemToDelete = await Cart.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    await itemToDelete.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
