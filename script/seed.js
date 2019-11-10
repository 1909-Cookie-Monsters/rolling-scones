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
  },
  {
    userId: 7
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
  },
  {
    firstName: 'Admin',
    lastName: 'AdminLast',
    email: 'admin@email.com',
    password: '123',
    isAdmin: true
  }
]

const products = [
  {
    name: 'chocolate chip',
    description: 'The chocolatiest chip',
    quantity: 8,
    brand: 'nestle',
    price: 3.43
  },
  {
    name: 'sugar',
    description: 'basic',
    quantity: 34,
    brand: 'keebler',
    price: 400
  },
  {
    name: 'oatmeal',
    description: 'no raisins',
    quantity: 100,
    brand: 'pillsbury',
    price: 43
  },
  {
    name: 'snickerdoodle',
    description: 'a bit better than sugar',
    quantity: 1,
    brand: 'pepperidge farm',
    price: 55
  },
  {
    name: 'ginger snap',
    description: 'must have grandchildren to order',
    quantity: 53,
    brand: 'grandma',
    price: 12
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
