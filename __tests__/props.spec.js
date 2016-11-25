/* global jest, describe, it, expect */
import React from 'react'
import * as Schemative from '../src/schemative'

console.error = jest.fn()

describe('React prop types suite', () => {
  it(`should fail when props don't match`, () => {
    const Simple = (props) => (<div className={props.name} />)
    const errorMessage = 'Warning: Failed prop type: Invalid prop `foo` of type `number` supplied to `Simple`, expected `string`.\n    in Simple'
    const schema = Schemative.createSchema({
      foo: Schemative.string
    })

    Simple.propTypes = schema.PropTypes

    ;(<Simple foo={2} />)

    expect(console.error).toHaveBeenCalledWith(errorMessage)
  })

  it(`should fail when props don't match with nested props`, () => {
    const Complex = (props) => (<div className={props.name} />)
    const errorMessage = 'Warning: Failed prop type: Invalid prop `name` of type `number` supplied to `Foo`, expected `string`.\n    in Foo'
    const schema = Schemative.createSchema({
      foo: Schemative.objectOf({
        bar: Schemative.arrayOf([
          Schemative.string,
          Schemative.string
        ])
      })
    })

    Complex.propTypes = schema.PropTypes

    ;(<Complex foo={{ bar: 2 }} />)

    expect(console.error).toHaveBeenLastCalledWith(errorMessage)
  })
})
