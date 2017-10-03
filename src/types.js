import { assign, reduce, noop } from 'lodash'
import PropTypes from 'prop-types'

const EXPOSED_PROPERTIES = ['value']

/**
 * Trigger a warning when assigning a value which does not
 * fit with the provided scalar.
 * Return default value.
 *
 * @param  {Any} candidate
 * @param  {Any} fallback
 * @param  {String} scalar
 * @return {Any}
 */
const evaluateValueType = (candidate, fallback, scalar) => {
  if (scalar !== 'any' && typeof candidate !== typeof fallback) {
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

/**
 * Given a value, type base and default value creates an Schemative type.
 * Create the object with the type definition.
 * Pick all the properties that goes to the prototype.
 * Add the properties to an object containing the type exposed values.
 *
 * @param  {Any} value        - Selected value
 * @param  {Object} base      - Contains basic type's data
 *   @param  {String} scalar    - Type name
 *   @param  {Func} propTypes   - React PropTypes equivalent
 * @param  {Any} defaultValue - Default type value
 * @return {Object}           - Type
 */
const createType = (value, base, defaultValue) => {
  const type = assign({}, base, {
    isRequired: !base.__required__ &&
      createType(value, createTypeBase(base, true), defaultValue)
  })
  const properties = reduce(type, (memo, value, property) => {
    if (EXPOSED_PROPERTIES.includes(property)) return memo

    return assign({}, memo, {
      [property]: { get: () => value }
    })
  }, {})

  return Object.defineProperties({
    value: evaluateValueType(value, defaultValue, base.scalar)
  }, properties)
}

const createTypeBase = (base, isRequired) => {
  const propType = PropTypes[base.scalar]

  return {
    ...base,
    __required__: !!isRequired,
    propType: isRequired ? propType.isRequired : propType,
    scalar: base.scalar
  }
}

const createTypeWithDefault = (scalar, defaultValue) => {
  const base = createType(defaultValue, createTypeBase({ scalar }), defaultValue)
  const type = (value) => createType(value, base, defaultValue)

  Object.getOwnPropertyNames(base).forEach((property) => {
    if (EXPOSED_PROPERTIES.includes(property)) {
      type[property] = base[property]
    } else {
      Object.defineProperty(type, property, {
        get: () => base[property]
      })
    }
  })

  return type
}

export const any = createTypeWithDefault('any', true)
export const array = createTypeWithDefault('array', [])
export const bool = createTypeWithDefault('bool', true)
export const element = createTypeWithDefault('element', noop)
export const func = createTypeWithDefault('func', noop)
export const number = createTypeWithDefault('number', 0)
export const object = createTypeWithDefault('object', {})
export const shape = createTypeWithDefault('shape', {})
export const string = createTypeWithDefault('string', '')
export const symbol = createTypeWithDefault('symbol', Symbol(''))
