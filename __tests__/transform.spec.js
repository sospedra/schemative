/* global describe, it, expect */
import { filterByKeys, transform } from '../src/transform'
import * as mocks from './mocks'

describe('Transform suite', () => {
  const keys = Object.keys(mocks.defs.simple)

  it('should filter by keys two objects', () => {
    expect(filterByKeys(keys, mocks.defs.complex)).toEqual(mocks.defs.simple)
  })

  it('should transform a definition into a fulfilled object', () => {
    expect(transform(mocks.defs.simple, mocks.fulfilled)).toEqual(mocks.fulfilled)
  })

  it('should transform a definition using mutators', () => {
    expect(transform(mocks.defs.simple, mocks.fulfilled, mocks.mutators)).toMatchSnapshot()
  })

  it('should be able to define agent mutators', () => {
    const mutator = { foo: 'bar' }
    transform.mutators = mutator

    expect(transform(mocks.defs.simple, mocks.fulfilled)).toMatchSnapshot()
    expect(transform.mutators).toEqual(mutator)
  })

  it('should be able to define keys declaratively', () => {
    transform.keys = keys
    expect(transform.keys).toEqual(keys)
  })
})
