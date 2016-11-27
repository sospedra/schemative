import counter from './index'
import defaultState from '../state'

describe('reducers', () => {
  describe('counter', () => {
    const incrementedState = Object.assign({
      value: 1
    }, defaultState)

    it('should provide the initial state', () => {
      expect(counter(undefined, {})).toBe(defaultState)
    })

    it('should handle INCREMENT action', () => {
      expect(counter(incrementedState, { type: 'INCREMENT' })).toMatchSnapshot()
    })

    it('should handle DECREMENT action', () => {
      expect(counter(incrementedState, { type: 'DECREMENT' })).toMatchSnapshot()
    })

    it('should ignore unknown actions', () => {
      expect(counter(incrementedState, { type: 'unknown' })).toMatchSnapshot()
    })
  })
})
