import { PropTypes } from 'react'
import Schemative from '../index'

export const reactPropTypes = {
  value: PropTypes.number,
  shape: PropTypes.shape({
    id: PropTypes.number,
    object: PropTypes.object,
    deep: PropTypes.shape({
      nested: PropTypes.string
    })
  }),
  func: PropTypes.func,
  arr: PropTypes.arrayOf([
    PropTypes.number,
    PropTypes.string
  ])
}

export const schemativePropTypes = {
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
  arr: PropTypes.arrayOf([
    PropTypes.number,
    PropTypes.string
  ])
}
