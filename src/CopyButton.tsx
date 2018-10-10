import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import s from './styles'
import copy = require('copy-text-to-clipboard')
import UiButton from './UiButton'

interface CopyButtonProps {
  text: string
  value: string
  entity?: string
  disabled?: boolean
}

interface CopyButtonState {
  show: boolean
}

const kf = {} as any
kf.Floatee = keyframes`
  0% {
    transform: translateY(-8px) translateX(-50%);
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-40px) translateX(-50%);
  }
`

const ui = {} as any
ui.Copy = styled.span`
  position: relative;
`
ui.Text = styled.span`
  position: absolute;
  bottom: 0;
  left: 50%;
  color: ${s['color-dark-blue']};
  animation-name: ${kf.Floatee};
  animation-iteration-count: 1;
  animation-duration: 300ms;
  animation-timing-function: ease-in;
  white-space: nowrap;
`

export default class CopyButton extends React.Component<CopyButtonProps, CopyButtonState> {
  static defaultProps = {
    entity: ''
  }

  state: CopyButtonState = {
    show: false
  }

  timeout?: number | undefined

  render() {
    return (
      <UiButton onClick={this.handleClick} disabled={this.props.disabled}>
        <ui.Copy>
          Copy {this.props.entity}
          {this.state.show && <ui.Text>Copied!</ui.Text>}
        </ui.Copy>
      </UiButton>
    )
  }

  handleClick = () => {
    copy(this.props.value)
    // So it always go into the starting animation state
    // when the user tries to spam click.
    this.setState(
      {
        show: false
      },
      () => {
        clearTimeout(this.timeout)
        this.setState({ show: true })
        this.timeout = window.setTimeout(() => {
          this.setState({
            show: false
          })
        }, 250)
      }
    )
  }
}
