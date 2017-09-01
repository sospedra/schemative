import { assign, noop } from 'lodash'

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

  return assign({}, charged, {
    isRequired: assign({}, charged, { baseIsRequired: true })
  })
}

const createType = (scalar, defaultValue) => {
  const base = charge(defaultValue, { scalar }, defaultValue)
  const type = (value) => charge(value, base, defaultValue)

  Object.keys(base).forEach((key) => {
    type[key] = base[key]
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
