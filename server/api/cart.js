const router = require('express').Router()
const {Cart, Order, Inventory} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const shoppingCart = await Order.findOne({
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
    res.json(shoppingCart)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const [instance, wasCreated] = await Cart.findOrCreate({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId,
        qty: req.body.qty
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

// router.put('/:id', async (req, res, next) => {
//   try {
//     const shoppingCart = await Order.findByPk(req.params.id)

//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
