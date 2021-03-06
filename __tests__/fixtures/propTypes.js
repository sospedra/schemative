import PropTypes from 'prop-types'
import * as Schemative from '../../src/schemative'

export const reactPropTypes = {
  name: PropTypes.string,
  year: PropTypes.number,
  value: PropTypes.number,
  shape: PropTypes.shape({
    id: PropTypes.number,
    object: PropTypes.object,
    deep: PropTypes.shape({
      nested: PropTypes.string
    })
  }),
  func: PropTypes.func,
  dispatch: PropTypes.func,
  arr: PropTypes.arrayOf([
    PropTypes.number,
    PropTypes.string
  ])
}

export const schemativePropTypes = {
  name: Schemative.string,
  year: Schemative.number,
  value: Schemative.number,
  shape: Schemative.shape({
    id: Schemative.number,
    object: Schemative.object,
    deep: Schemative.shape({
      nested: Schemative.string
    })
  }),
  func: Schemative.func,
  dispatch: Schemative.func,
  arr: Schemative.arrayOf([
    Schemative.number,
    Schemative.string
  ])
}

export const simple = {
  name: Schemative.string,
  year: Schemative.number
}

export const complex = Object.assign({
  contacts: Schemative.array,
  geo: Schemative.object,
  getName: Schemative.func
}, simple)

export const array = Schemative.arrayOf([
  Schemative.number,
  Schemative.number
])

export const simpleNested = {
  name: Schemative.string,
  contact: array
}

export const object = Schemative.shape({
  id: Schemative.number
})

export const complexNested = {
  geo: Schemative.objectOf({
    coord: Schemative.number,
    country: object,
    flag: Schemative.arrayOf([
      Schemative.string,
      Schemative.string
    ])
  })
}

export const isRequiredPropTypes = {
  req: Schemative.string.isRequired,
  geo: Schemative.objectOf({
    coord: Schemative.number.isRequired,
    country: object,
    flag: Schemative.arrayOf([
      Schemative.string.isRequired,
      Schemative.string
    ])
  })
}
