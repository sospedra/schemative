import _ from 'lodash'

let protoMutators = {}

export const filterByKeys = (definition, candidate) => {
  const keys = _.intersection(_.keys(definition), _.keys(candidate))
  return _.pick(candidate, keys)
}

export const transform = (definition, candidate, mutators = protoMutators) => {
  return Object.assign(
    filterByKeys(definition, candidate),
    _.reduce(mutators, (memo, value, key) => Object.assign({
      [key]: _.isFunction(value) ? value(candidate) : value
    }, memo), {})
  )
}

Object.defineProperty(transform, 'mutators', {
  get: () => protoMutators,
  set: (mutators) => {
    protoMutators = mutators
  }
})
