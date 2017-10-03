import tsil from 'tsil'

import createPropTypes from './createPropTypes'
import createDefaults from './createDefaults'
import createTransform from './createTransform'

export * from './types'

export const createSchema = (definition) => {
  const nodes = tsil.flatten(definition)

  return {
    __schemative__: true,
    PropTypes: createPropTypes(nodes),
    Default: createDefaults(nodes),
    transform: createTransform(nodes)
  }
}
