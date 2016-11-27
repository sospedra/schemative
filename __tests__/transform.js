/* global describe, it, expect */
import { filterByKeys, transform } from '../src/parsers'
import * as mocks from './mocks'

describe('Transform suite', () => {
  it('should filter by keys two objects', () => {
    expect(filterByKeys(mocks.defs.simple, mocks.defs.complex)).toEqual(mocks.defs.simple)
  })

  it('should transform a definition into a fulfilled object', () => {
    expect(transform(mocks.defs.simple, mocks.fulfilled)).toEqual(mocks.fulfilled)
  })

  it('should transform a definition using mutators', () => {
    expect(transform(mocks.defs.simple, mocks.fulfilled, mocks.mutators)).toMatchSnapshot()
  })
})