const Sequelize = require('sequelize')
const db = require('../db')

const Inventory = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false // validating not empty
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'https://media.istockphoto.com/photos/anzac-biscuit-isolated-clipping-path-picture-id183764572'
  },
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      // be careful when calculating prices
      min: 0.0
    }
  }
})

module.exports = Inventory
