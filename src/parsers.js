import _ from 'lodash'

export const getPropType = (prop, attr) => {
  return prop.iterable ? recursiveValues(prop, attr) : prop[attr]
}

export const recursiveObject = (values, attr) => {
  return _.reduce(values, (memo, prop, key) => Object.assign({
    [key]: getPropType(prop, attr)
  }, memo), {})
}

export const recursiveArray = (values, attr) => {
  return _.map(values, (prop) => {
    return getPropType(prop, attr)
  })
}

export const selectRecursiveStrategy = (values, attr) => {
  return _.isArray(values)
    ? recursiveArray(values, attr)
    : recursiveObject(values, attr)
}

export const recursiveValues = ({ type, values }, attr) => {
  const exec = attr === 'type' ? type : _.identity
  return exec(selectRecursiveStrategy(values, attr))
}

export const createPropTypes = (definition) => {
  return recursiveObject(definition, 'type')
}

export const createDefault = (definition) => {
  return recursiveObject(definition, 'default')
}

export const filterByKeys = (definition, candidate) => {
  const keys = _.intersection(_.keys(definition), _.keys(candidate))
  return _.pick(candidate, keys)
}

export const transform = (definition, candidate, mutators) => Object.assign(
  filterByKeys(definition, candidate),
  _.reduce(mutators, (memo, value, key) => Object.assign({
    [key]: _.isFunction(value) ? value(candidate) : value,
    memo
  }), {})
)
