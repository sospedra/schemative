import { PropTypes } from 'react'
import _ from 'lodash'

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

export const createSchemaByObject = (schema, attr) => {
  return _.entries(schema)
    .reduce((memo, [key, value]) => {
      memo[key] = value.iterable
        ? selectRecursiveStrategy(value.value, attr)
        : value[attr]
      return memo
    }, {})
}

export const createSchemaByArray = (schema, attr) => {
  return _.map(schema, (values) => {
    return values.iterable
      ? selectRecursiveStrategy(values.value, attr)
      : values[attr]
  })
}

export const selectRecursiveStrategy = (nestedSchema, attr) => {
  return _.isArray(nestedSchema)
    ? createSchemaByArray(nestedSchema, attr)
    : createSchemaByObject(nestedSchema, attr)
}

export const createPropTypes = (schema) => {
  return createSchemaByObject(schema, 'propTypes')
}

export const createDefault = (schema) => {
  return createSchemaByObject(schema, 'value')
}

export const filterByKeys = (schema, candidate) => {
  const keys = _.intersection(_.keys(schema), _.keys(candidate))
  return _.pick(candidate, keys)
}

export const transform = (schema, candidate, attributes) => Object.assign(
  filterByKeys(schema, candidate),
  _.reduce(attributes, (memo, value, key) => Object.assign(
    memo,
    {
      [key]: _.isFunction(value) ? value(candidate) : value
    }
  ), {})
)

export const createSchema = (schema) => ({
  PropTypes: createPropTypes(schema),
  Default: createDefault(schema),
  transform: transform.bind(null, schema)
})
