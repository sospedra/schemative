/* global describe, it, expect */
import { filterByKeys, createTransform } from '../src/transform'
import * as mocks from './mocks'

describe('Suite transform', () => {
  const keys = Object.keys(mocks.defs.simple)

  it('should filter by keys two objects', () => {
    expect(filterByKeys(keys, mocks.defs.complex)).toEqual(mocks.defs.simple)
  })

  it('should transform a definition into a fulfilled object', () => {
    const transform = createTransform(mocks.defs.simple)
    expect(transform(mocks.fulfilled)).toEqual(mocks.fulfilled)
  })

  it('should transform a definition using mutators', () => {
    const transform = createTransform(mocks.defs.simple)
    expect(transform(mocks.fulfilled, mocks.mutators)).toMatchSnapshot()
  })

  it('should be able to define agent mutators', () => {
    const transform = createTransform(mocks.defs.simple)
    const mutator = { foo: 'bar' }
    transform.mutators = mutator

    expect(transform(mocks.fulfilled)).toMatchSnapshot()
    expect(transform.mutators).toEqual(mutator)
  })

  it('should create islated transforms methods', () => {
    const keyAlpha = 'foo'
    const transformAlpha = createTransform(mocks.defs.simple)
    const mutatorAlpha = { [keyAlpha]: 'bar' }
    transformAlpha.mutators = mutatorAlpha

    const keyBeta = 'baz'
    const transformBeta = createTransform(mocks.defs.simple)
    const mutatorBeta = { [keyBeta]: 1337 }
    transformBeta.mutators = mutatorBeta

    const alpha = transformAlpha(mocks.fulfilled)
    const beta = transformBeta(mocks.fulfilled)

    expect(Object.keys(alpha).includes(keyBeta)).toBe(false)
    expect(Object.keys(beta).includes(keyAlpha)).toBe(false)
  })
})
