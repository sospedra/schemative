import _ from 'lodash'

export const filterByKeys = (defsKeys, candidate) => {
  const keys = _.intersection(defsKeys, _.keys(candidate))
  return _.pick(candidate, keys)
}

export const createTransform = (definitions) => {
  const defsKeys = _.keys(definitions)
  let protoMutators = {}

  const transform = (candidate, mutators = protoMutators) => {
    return Object.assign(
      filterByKeys(defsKeys, candidate),
      _.reduce(mutators, (memo, value, key) => Object.assign({
        [key]: _.isFunction(value) ? value(candidate, definitions) : value
      }, memo), {})
    )
  }

  Object.defineProperty(transform, 'mutators', {
    get: () => protoMutators,
    set: (mutators) => {
      protoMutators = mutators
    }
  })

  return transform
}
