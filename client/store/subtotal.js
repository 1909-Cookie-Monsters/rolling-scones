export const UPDATE_SUBTOTAL = 'UPDATE_SUBTOTAL'

export const updateSubtotal = subtotal => {
  return {
    type: UPDATE_SUBTOTAL,
    subtotal
  }
}

export const subTotalReducer = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_SUBTOTAL:
      return action.subtotal
    default:
      return state
  }
}

export default subTotalReducer
