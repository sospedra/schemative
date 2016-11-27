import React, { Component, PropTypes } from 'react'
import { schema } from './state'

class Counter extends Component {
  // Extends the state propTypes with the container dispatchToProps
  static propTypes = Object.assign({
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
  }, schema.PropTypes)

  incrementIfOdd = () => {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync = () => {
    setTimeout(this.props.onIncrement, 1000)
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props
    return (
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        {' '}
        <button onClick={onDecrement}>
          -
        </button>
        {' '}
        <button onClick={this.incrementIfOdd}>
          Increment if odd
        </button>
        {' '}
        <button onClick={this.incrementAsync}>
          Increment async
        </button>
      </p>
    )
  }
}

export default Counter
