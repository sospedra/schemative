import defaultState from '../state'

// Stop worrying about initial state
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        value: state.value + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        value: state.value - 1
      }
    default:
      return state
  }
}
