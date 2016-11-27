import {
  reactPropTypes,
  schemativePropTypes,
  simple,
  complex,
  simpleNested,
  complexNested,
  array,
  object,
  isRequiredPropTypes
} from './fixtures/propTypes'

export const defs = {
  reactPropTypes,
  schemativePropTypes,
  simple,
  complex,
  simpleNested,
  complexNested,
  array,
  object,
  isRequiredPropTypes
}

export const fulfilled = {
  name: 'Ada Lovelace',
  year: 1815
}

export const mutators = {
  extra: 'attribute',
  year: (candidate) => candidate.year + 37
}

export const types = [
  'array',
  'bool',
  'func',
  'number',
  'object',
  'string',
  'symbol',
  'any',
  'element',
  'instanceOf',
  'node'
]

export const functionTypes = [
  ['oneOf', []],
  ['oneOfType', []],
  ['arrayOf', []],
  ['objectOf', {}],
  ['shape', {}]
]
