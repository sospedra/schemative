/* global describe, it, expect */
const { PropTypes } = require('react')
const Schemative = require('../src/schemative')
const mocks = require('./mocks')

describe('Types suite', () => {
  it('should have exist all the defined types', () => {
    mocks.types.forEach((type) => {
      expect(Schemative[type]).toMatchSnapshot()
    })

    mocks.functionTypes.forEach(([type]) => {
      expect(Schemative[type]).toMatchSnapshot()
    })
  })

  it('should be compatible with React.PropTypes', () => {
    mocks.types.forEach((type) => {
      expect(Schemative[type].propTypes).toEqual(PropTypes[type])
    })

    mocks.functionTypes.forEach(([type, baseType]) => {
      expect(Schemative[type](baseType).propTypes).toEqual(PropTypes[type])
    })
  })
})
