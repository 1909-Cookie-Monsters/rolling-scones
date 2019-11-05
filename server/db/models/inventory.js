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
    allowNull: false
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
      'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiYrfW7tdPlAhXqUd8KHXEeArMQjRx6BAgBEAQ&url=https%3A%2F%2Ftwitter.com%2Foreo_problems&psig=AOvVaw3FnNbTraevujCvQXClFKR6&ust=1573055191959805'
  }
})

module.exports = Inventory
