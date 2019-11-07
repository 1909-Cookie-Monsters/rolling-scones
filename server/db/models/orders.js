const Sequelize = require('sequelize')
const db = require('../db')
const Cart = require('./cart')

const Order = db.define('order', {
  checkedOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0,
    validate: {
      min: 0.0
    }
  }
})

module.exports = Order
