/* global describe, it, expect */
import * as parsers from '../src/parsers'
import * as mocks from './mocks'

describe('Suite parsers', () => {
  const {
    getPropType,
    recursiveObject,
    recursiveArray,
    selectRecursiveStrategy,
    recursiveValues,
    createPropTypes,
    createDefault,
    filterByKeys,
    transform
  } = parsers

  it('should return the defined value or a recursion', () => {
    expect(getPropType(mocks.defs.simple.name, 'type')).toBe(mocks.defs.simple.name.type)
    expect(getPropType(mocks.defs.simple.name, 'default')).toBe(mocks.defs.simple.name.default)
    expect(getPropType(mocks.defs.object, 'type')).toMatchSnapshot()
  })

  it('should create an schema given an object', () => {
    expect(recursiveObject(mocks.defs.object)).toMatchSnapshot()
  })

  it('should create an schema given an array', () => {
    expect(recursiveArray(mocks.defs.array)).toMatchSnapshot()
  })

  it('should select an strategy for recursivity', () => {
    expect(selectRecursiveStrategy(mocks.defs.array)).toMatchSnapshot()
    expect(selectRecursiveStrategy(mocks.defs.object)).toMatchSnapshot()
  })

  it('should create the schema prop types', () => {
    expect(createPropTypes(mocks.defs.schemativePropTypes)).toMatchSnapshot()
  })

  it('should create the schema prop types with isRequired', () => {
    expect(createPropTypes(mocks.defs.isRequiredPropTypes)).toMatchSnapshot()
  })

  it('should create the schema default values', () => {
    expect(createDefault(mocks.defs.schemativePropTypes)).toMatchSnapshot()
  })

  it('should filter by keys two objects', () => {
    expect(filterByKeys(mocks.defs.simple, mocks.defs.complex)).toEqual(mocks.defs.simple)
  })

  it('should transform a definition into a fulfilled object', () => {
    expect(transform(mocks.defs.simple, mocks.fulfilled)).toEqual(mocks.fulfilled)
  })

  it('should transform a definition using mutators', () => {
    expect(transform(mocks.defs.simple, mocks.fulfilled, mocks.mutators)).toMatchSnapshot()
  })
})
