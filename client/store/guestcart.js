export const RETRIEVE_GC = 'RETRIEVE_GC'
export const retrieveGC = products => ({
  type: RETRIEVE_GC,
  products
})

const REMOVE_ITEM_GC = 'REMOVE_ITEM_GC'

export const removeItemGC = productId => {
  return {
    type: REMOVE_ITEM_GC,
    productId
  }
}

const guestCartReducer = (state = [], action) => {
  switch (action.type) {
    case RETRIEVE_GC:
      let tracker = {}
      let newState = []
      if (action.products) {
        action.products.forEach(element => {
          let id = element.id
          if (tracker[id]) {
            tracker[id].qty++
          } else {
            tracker[id] = element
            element.qty = 1
          }
        })
        newState = Object.values(tracker)
      }
      return newState
    case REMOVE_ITEM_GC:
      let stateRemoved = [...state].filter(
        element => element.id !== action.productId
      )
      return stateRemoved
    default:
      return state
  }
}

export default guestCartReducer
