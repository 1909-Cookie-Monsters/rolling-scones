'use strict'

const db = require('../server/db')
const {User, Inventory, Cart, Order} = require('../server/db/models')

const orders = [
  {
    userId: 1
  },
  {
    userId: 2
  },
  {
    userId: 3
  },
  {
    userId: 4
  },
  {
    userId: 5
  },
  {
    userId: 6
  }
]

const carts = [
  {
    orderId: 1,
    productId: 1,
    qty: 2
  },
  {
    orderId: 1,
    productId: 3,
    qty: 1
  },
  {
    orderId: 1,
    productId: 2,
    qty: 2
  },
  {
    orderId: 2,
    productId: 1,
    qty: 2
  }
]

const customers = [
  {
    firstName: 'Samantha',
    lastName: 'Lastig',
    email: 'slastig@cookiemonsters.com',
    password: 'cookiesrock'
  },
  {
    firstName: 'Alvin',
    lastName: 'Togonon',
    email: 'atogonon@cookiemonsters.com',
    password: 'abc123'
  },
  {
    firstName: 'Alex',
    lastName: 'Paul',
    email: 'apaul@cookiemonster.com',
    password: 'alexpassword'
  },
  {
    firstName: 'Maxim',
    lastName: 'Kaloev',
    email: 'mkaloev@cookiemonsters.com',
    password: 'maxpass'
  },
  {
    firstName: 'Austin',
    lastName: 'Wu',
    email: 'awe@cookiemonsters.com',
    password: 'austinpassword'
  },
  {
    firstName: 'Cody',
    lastName: 'Cafe',
    email: 'cody@email.com',
    password: '123'
  }
]

const products = [
  {
    name: 'Chocolate Chip Scone',
    description:
      "Mick Jagger's all time favorite scone! This buttery and chocolatey scone will bring it's eaters SATISFACTION!",
    quantity: 8,
    brand: 'Scone',
    imageUrl:
      'https://prettysimplesweet.com/wp-content/uploads/2018/10/Chocolate_Chip_Scones.jpg',
    price: 3.5
  },
  {
    name: 'Blueberry Scone with Vanilla Drizzle',
    description:
      "Keith Richard's has said this scone is what gets his morning started! This blueberry delight will have you running back for more!",
    quantity: 34,
    brand: 'Scone',
    imageUrl:
      'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2014/07/blueberry-scones-with-icing.jpg',
    price: 4.0
  },
  {
    name: 'Bacon, Pepper Jack, and Jalapeno Scone',
    description:
      "If you're a savory breakfast lover, this scone will change your life!",
    quantity: 100,
    brand: 'Scone',
    imageUrl:
      'https://bakerbynature.com/wp-content/uploads/2015/03/IMG_8526-2.jpg',
    price: 4.5
  },
  {
    name: 'Classic Pumpkin Scone (Seasonal!)',
    description:
      'Your favorite seasonal breakfast is now available through November!',
    quantity: 50,
    brand: 'Scone',
    imageUrl:
      'https://www.theflavorbender.com/wp-content/uploads/2019/09/Pumpkin-Scones-3811-780x1169.jpg',
    price: 4.5
  },
  {
    name: 'Cream Scone',
    description:
      'Our play on an original, plain scone - this scone is classic, simple yet still moist and delicious!',
    quantity: 53,
    brand: 'Scone',
    imageUrl:
      'https://www.platingsandpairings.com/wp-content/uploads/2015/10/Honey-Cream-Scones-17.jpg',
    price: 3.5
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all(
    customers.map(customer => User.create(customer))
  )

  const inventory = await Promise.all(
    products.map(product => Inventory.create(product))
  )

  const dummyOrders = await Promise.all(
    orders.map(order => Order.create(order))
  )

  const dummyCart = await Promise.all(carts.map(cart => Cart.create(cart)))

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${inventory.length} inventory`)
  console.log(`seeded ${dummyOrders.length} orders`)
  console.log(`seeded ${dummyCart.length} carts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
