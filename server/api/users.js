const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('Unauthorized user')
    error.status = 401
    next(error)
  }
}

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      res.status(200).send(user)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    const newOrder = await Order.create({userId: newUser.id})
    res.status(201).send(newUser)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const userUpdate = await User.findByPk(req.params.id)
    if (userUpdate) {
      const newUser = await userUpdate.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        shippingAddress: req.body.shippingAddress,
        billingAddress: req.body.billingAddress,
        email: req.body.email,
        paymentInfo: req.body.paymentInfo,
        password: req.body.password
      })
      res.status(200).send(newUser)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const deleteUser = await User.findByPk(req.params.id)
    if (deleteUser) {
      await deleteUser.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
