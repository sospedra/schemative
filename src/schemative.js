import tsil from 'tsil'

import { createPropTypes, createDefault } from './parsers'
import { createTransform } from './transform'

export * from './types'

export const createSchema = (definition) => {
  const nodes = tsil.flatten(definition)

  return {
    PropTypes: createPropTypes(nodes),
    Default: createDefault(nodes),
    transform: createTransform(nodes)
  }
}
