const router = require('express').Router()
const {Inventory} = require('../db/models')
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
    const products = await Inventory.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Inventory.findByPk(req.params.id)
    if (product) {
      res.status(200).send(product)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const newProduct = await Inventory.create({
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      brand: req.body.brand,
      imageUrl: req.body.imageUrl,
      price: req.body.price
    })
    res.status(201).send(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const productUpdate = await Inventory.findByPk(req.params.id)
    if (productUpdate) {
      const newProduct = await productUpdate.update({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        brand: req.body.brand,
        imageUrl: req.body.imageUrl,
        price: req.body.price
      })
      res.status(200).send(newProduct)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const deleteProduct = await Inventory.findByPk(req.params.id)
    if (deleteProduct) {
      await deleteProduct.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
