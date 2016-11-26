const { PropTypes } = require('react')
const Schemative = require('./lib/schemative')
const schema = Schemative.createSchema({
  name: Schemative.string,
  year: Schemative.number.isRequired
})
