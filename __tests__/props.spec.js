/* global beforeEach, jest, describe, it, expect */
import React from 'react'
import * as Schemative from '../src/schemative'

const createErrorInvalid = ({ attr, type, expected, component }) => [
  'Warning: Failed prop type: Invalid prop',
  `\`${attr}\` of type \`${type}\``,
  `supplied to \`${component}\`,`,
  `expected \`${expected}\`.\n`,
  `   in ${component}`
].join(' ')

const createErrorMissing = ({ attr, component }) => [
  'Warning: Failed prop type:',
  `The prop \`${attr}\` is marked as required`,
  `in \`${component}\`,`,
  'but its value is `undefined`.\n',
  `   in ${component}`
].join(' ')

beforeEach(() => {
  console.error = jest.fn()
})

describe('React prop types suite', () => {
  it(`should fail when props don't match`, () => {
    const Simple = (props) => (<div className={props.name} />)
    const errorMessage = createErrorInvalid({
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
    const errorMessage = createErrorInvalid({
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

  it(`should fail when isRequired prop is not present`, () => {
    const Required = (props) => (<div className={props.name} />)
    const errorMessage = createErrorMissing({
      attr: 'foo',
      component: 'Required'
    })
    const schema = Schemative.createSchema({
      foo: Schemative.string.isRequired
    })

    Required.propTypes = schema.PropTypes

    ;(<Required />)

    expect(console.error).toHaveBeenCalledWith(errorMessage)
  })
})
