/* global describe, it, expect */
import { PropTypes } from 'react'
import * as Schemative from '../src/schemative'
// import * as parsers from '../src/parsers'
import * as mocks from './mocks'

describe('Suite types', () => {
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

describe('Suite createSchema', () => {
  it('should create from a simple non-nested definition', () => {
    const simple = {
      name: Schemative.string,
      year: Schemative.number
    }
    expect(Schemative.createSchema(simple)).toMatchSnapshot()
  })

  it('should create from a complex non-nested definition', () => {
    const complex = {
      contacts: Schemative.array,
      geo: Schemative.object,
      getName: Schemative.func
    }
    expect(Schemative.createSchema(complex)).toMatchSnapshot()
  })

  it('should create from a simple nested definition', () => {
    const simpleNested = {
      name: Schemative.string,
      contacts: Schemative.arrayOf([
        Schemative.number,
        Schemative.number
      ])
    }
    expect(simpleNested).toMatchSnapshot()
  })

  it('should create from a complex nested definition', () => {
    const complexNested = {
      geo: Schemative.objectOf({
        coord: Schemative.number,
        country: Schemative.shape({
          id: Schemative.number,
          flag: Schemative.arrayOf([
            Schemative.string,
            Schemative.string
          ])
        })
      })
    }
    expect(complexNested).toMatchSnapshot()
  })
})

describe('Suite parsers', () => {
  it('should ')
})
