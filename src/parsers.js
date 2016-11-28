import _ from 'lodash'

export const getPropType = (prop, attr) => {
  return prop.iterable
    ? recursiveValues(prop, attr)
    : prop[attr]
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
  return selectRecursiveStrategy(definition, 'type')
}

export const createDefault = (definition) => {
  return selectRecursiveStrategy(definition, 'default')
}
