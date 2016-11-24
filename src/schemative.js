import { PropTypes } from 'react'
import _ from 'lodash/util'
import {
  createPropTypes,
  createDefault,
  transform
} from './parsers'

const createType = (type, def) => ({
  propTypes: PropTypes[type],
  value: def,
  iterable: false
})

const createFunctionType = (type) => (values) => ({
  propTypes: PropTypes[type],
  value: values,
  iterable: true
})

export const array = createType('array', _.stubArray())
export const bool = createType('bool', _.stubTrue())
export const func = createType('func', _.noop())
export const number = createType('number', -1)
export const object = createType('object', _.stubObject())
export const string = createType('string', _.stubString())
export const symbol = createType('symbol', Symbol)
export const any = createType('any', _.stubTrue())
export const element = createType('element', _.stubFalse())
export const instanceOf = createType('instanceOf', _.stubFalse())
export const node = createType('node', _.stubFalse())
export const oneOf = createFunctionType('oneOf')
export const oneOfType = createFunctionType('oneOfType')
export const arrayOf = createFunctionType('arrayOf')
export const objectOf = createFunctionType('objectOf')
export const shape = createFunctionType('shape')

export const createSchema = (schema) => ({
  PropTypes: createPropTypes(schema),
  Default: createDefault(schema),
  transform: transform.bind(null, schema)
})
