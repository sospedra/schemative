/* global describe, it, expect */
import { PropTypes } from 'react'
import * as Schemative from '../src/schemative'
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
      expect(Schemative[type].type).toEqual(PropTypes[type])
    })

    mocks.functionTypes.forEach(([type, baseType]) => {
      expect(Schemative[type](baseType).type).toEqual(PropTypes[type])
    })
  })

  it('should allow isRequired extra prop', () => {
    mocks.types.forEach((type) => {
      expect(Schemative[type].isRequired).toMatchSnapshot()
      expect(Schemative[type].type.isRequired).toEqual(PropTypes[type].isRequired)
    })

    mocks.functionTypes.forEach(([type, baseType]) => {
      expect(Schemative[type].isRequired).toMatchSnapshot()
      expect(Schemative[type](baseType).type.isRequired).toEqual(PropTypes[type].isRequired)
    })
  })
})

describe('Suite createSchema', () => {
  it('should create from a simple non-nested definition', () => {
    expect(Schemative.createSchema(mocks.defs.simple)).toMatchSnapshot()
  })

  it('should create from a complex non-nested definition', () => {
    expect(Schemative.createSchema(mocks.defs.complex)).toMatchSnapshot()
  })

  it('should create from a simple nested definition', () => {
    expect(mocks.defs.simpleNested).toMatchSnapshot()
  })

  it('should create from a complex nested definition', () => {
    expect(mocks.defs.complexNested).toMatchSnapshot()
  })
})

describe('Suite schema', () => {
  const schema = Schemative.createSchema(mocks.defs.schemativePropTypes)

  it('should return the PropTypes', () => {
    expect(schema.PropTypes).toMatchSnapshot()
  })

  it('should return the default values', () => {
    expect(schema.Default).toMatchSnapshot()
  })

  it('should return a new fulfilled object after transform', () => {
    expect(schema.transform(mocks.fulfilled)).toMatchSnapshot()
  })

  it('should return a new fulfilled object with mutators', () => {
    expect(schema.transform(mocks.fulfilled, mocks.mutators)).toMatchSnapshot()
  })
})
