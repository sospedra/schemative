import { assign, reduce, noop } from 'lodash'
import PropTypes from 'prop-types'

const evaluateValueType = (candidate, fallback) => {
  if (typeof candidate !== typeof fallback) {
    console.warn(
      'Evalute Schemative type expected',
      typeof fallback, 'but receive', typeof candidate,
      'when', candidate, 'value was set.',
      'Default value is returned instead.'
    )

    return fallback
  }

  return candidate
}

const charge = (value, base, defaultValue) => {
  const charged = assign({}, base, {
    value: evaluateValueType(value, defaultValue),
    baseIsRequired: false,
    isRequired: undefined
  })
  const properties = reduce(charged, (memo, value, property) => {
    return assign({}, memo, {
      [property]: { get: () => value }
    })
  }, {})

  return Object.defineProperties({}, properties)
}

const createType = (scalar, defaultValue) => {
  const propType = PropTypes[scalar]
  const base = charge(defaultValue, { scalar, propType }, defaultValue)
  const type = (value) => charge(value, base, defaultValue)

  Object.getOwnPropertyNames(base).forEach((property) => {
    Object.defineProperty(type, property, {
      get: () => base[property]
    })
  })

  return type
}

export const any = createType('any', true)
export const array = createType('array', [])
export const bool = createType('bool', true)
export const element = createType('element', noop)
export const func = createType('func', noop)
export const number = createType('number', 0)
export const object = createType('object', {})
export const shape = createType('shape', {})
export const string = createType('string', '')
export const symbol = createType('symbol', Symbol(''))
