import * as Schemative from 'schemative'

export const schema = Schemative.createSchema({
  value: Schemative.number.isRequired
})

export default schema.Default
