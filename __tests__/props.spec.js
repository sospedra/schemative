/* global jest, describe, it, expect */
import React from 'react'
import * as Schemative from '../src/schemative'

console.error = jest.fn()
const createErrorMessage = ({ attr, type, expected, component }) => [
  'Warning: Failed prop type: Invalid prop',
  `\`${attr}\` of type \`${type}\``,
  `supplied to \`${component}\`,`,
  `expected \`${expected}\`.\n`,
  `   in ${component}`
].join(' ')

describe('React prop types suite', () => {
  it(`should fail when props don't match`, () => {
    const Simple = (props) => (<div className={props.name} />)
    const errorMessage = createErrorMessage({
      attr: 'foo',
      type: 'number',
      component: 'Simple',
      expected: 'string'
    })
    const schema = Schemative.createSchema({
      foo: Schemative.string
    })

    Simple.propTypes = schema.PropTypes

    ;(<Simple foo={2} />)

    expect(console.error).toHaveBeenCalledWith(errorMessage)
  })

  it(`should fail when props don't match with nested props`, () => {
    const Complex = (props) => (<div className={props.name} />)
    const errorMessage = createErrorMessage({
      attr: 'foo.bar',
      type: 'number',
      component: 'Complex',
      expected: 'array'
    })
    const schema = Schemative.createSchema({
      foo: Schemative.shape({
        bar: Schemative.array
      })
    })

    Complex.propTypes = schema.PropTypes

    ;(<Complex foo={{ bar: 2 }} />)

    expect(console.error).toHaveBeenCalledWith(errorMessage)
  })
})
