import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface PositionProps {
  offset: number
  target: () => HTMLElement
  children: (state: PositionState) => JSX.Element
}

interface PositionState {
  top: number
  left: number
}

export default class Position extends React.Component<PositionProps, PositionState> {
  static defaultProps = {
    offset: 0
  }

  state: PositionState = {
    top: 0,
    left: 0
  }

  componentDidMount() {
    const targetBox = this.props.target().getBoundingClientRect()
    const tooltipBox = ReactDOM.findDOMNode(this).getBoundingClientRect()

    this.setState({
      top: -(tooltipBox.height / 2 - targetBox.height / 2),
      left: -(tooltipBox.width + this.props.offset)
    })
  }

  render() {
    return this.props.children(this.state)
  }
}
