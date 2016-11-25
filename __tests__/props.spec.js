/* global describe, it, expect */
import React from 'react'
import * as Schemative from '../src/schemative'
import * as mocks from './mocks'

class Foo extends React.Component {
  render () {
    return (
      <div className={this.props.name} />
    )
  }
}

const schema = Schemative.createSchema(mocks.defs.simple)

describe('React prop types suite', () => {
  it('should accept an schema.PropTypes as React.propTypes', () => {
    try {
      Foo.propTypes = schema.PropTypes
      expect(true)
    } catch (err) {
      expect(err).toBe(false)
    }
  })
})
