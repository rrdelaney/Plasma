const initialState = {
  test: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'ADD_TEST':
      return {
        test: true
      }
    case 'DELETE_TEST':
      return {
        test: false
      }
    default:
      return state
  }
}
