export const RETRIEVE_GC = 'RETRIEVE_GC'
export const retrieveGC = products => ({
  type: RETRIEVE_GC,
  products
})

const guestCartReducer = (state = [], action) => {
  switch (action.type) {
    case RETRIEVE_GC:
      console.log('this is guest_cart state ----->', action.products)
      return action.products
    default:
      return state
  }
}

export default guestCartReducer
