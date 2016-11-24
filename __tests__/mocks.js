const mocks = module.exports = {}

mocks.types = [
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

mocks.functionTypes = [
  ['oneOf', []],
  ['oneOfType', []],
  ['arrayOf', []],
  ['objectOf', {}],
  ['shape', {}]
]
