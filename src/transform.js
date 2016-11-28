import _ from 'lodash'

let protoMutators = {}
let defsKeys = {}

export const filterByKeys = (defsKeys, candidate) => {
  const keys = _.intersection(defsKeys, _.keys(candidate))
  return _.pick(candidate, keys)
}

export const createTransform = (definitions) => {
  transform.keys = _.keys(definitions)
  return transform
}

export const transform = (candidate, mutators = protoMutators) => {
  return Object.assign(
    filterByKeys(defsKeys, candidate),
    _.reduce(mutators, (memo, value, key) => Object.assign({
      [key]: _.isFunction(value) ? value(candidate, defsKeys) : value
    }, memo), {})
  )
}

Object.defineProperty(transform, 'mutators', {
  get: () => protoMutators,
  set: (mutators) => {
    protoMutators = mutators
  }
})

Object.defineProperty(transform, 'keys', {
  get: () => defsKeys,
  set: (definitions) => {
    defsKeys = definitions
  }
})
