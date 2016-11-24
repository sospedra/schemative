import _ from 'lodash'

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
