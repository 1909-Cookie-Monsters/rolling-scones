const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
    validate: {
      min: 0.0
    }
  }
})

module.exports = Cart
