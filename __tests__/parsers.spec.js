/* global jest, describe, it, expect */
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
    createDefault
  } = parsers

  const defObject = Object.assign({}, mocks.defs.object, {
    type: jest.fn()
  })

  it('should return the defined value or a recursion', () => {
    expect(getPropType(mocks.defs.simple.name, 'type')).toBe(mocks.defs.simple.name.type)
    expect(getPropType(mocks.defs.simple.name, 'default')).toBe(mocks.defs.simple.name.default)

    getPropType(defObject, 'type')
    expect(defObject.type).toHaveBeenCalled()
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

  it('should execute a recursive strategy with PropType or identity', () => {
    expect(defObject.type).toHaveBeenCalled()
    expect(recursiveValues(defObject, 'default')).toEqual({
      id: 0
    })
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
})
