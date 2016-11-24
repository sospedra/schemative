/* global describe, it, expect */
import { PropTypes } from 'react'
import * as Schemative from '../src/schemative'
import * as mocks from './mocks'

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
