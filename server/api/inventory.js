const router = require('express').Router()
const {Inventory} = require('../db/models')
module.exports = router

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

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Inventory.create(req.body)
    res.status(201).send(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const productUpdate = await Inventory.findByPk(req.params.id)
    if (productUpdate) {
      const newProduct = await productUpdate.update(req.body)
      res.status(200).send(newProduct)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
