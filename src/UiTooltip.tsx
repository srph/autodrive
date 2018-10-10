import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import s from './styles'
import Position from './Position'

const ui = {}
ui.Wrapper = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  margin-right: 16px;
  padding: 8px;
  font-size: 10px;
  background: rgba(0,0,0,0.6);
  color: ${s['color-white']};
  border-radius: 4px;
  font-family: ${s['font-family']};
  pointer-events: none;
  white-space: nowrap;
  text-transform: none;
  font-weight: 400;
`
ui.Arrow = styled.div`
  position: absolute;
  top: 10px;
  right: -8px;
  height: 0;
  width: 0;
  border-width: 4px;
  border-color: transparent;
  border-style: solid;
  border-left-color: rgba(0,0,0,0.6);
`
ui.Trigger = styled.div`
  button:disabled {
    /* https://github.com/facebook/react/issues/4251#issuecomment-267004045 */
    pointer-events: none;
  }
`

interface UiTooltipProps {
  children: JSX.Element
  text: string
  attachment?: string
  disabled?: boolean
}

interface UiTooltipState {
  isActive: boolean
}

export default class UiTooltip extends React.Component<UiTooltipProps, UiTooltipState> {
  state: UiTooltipState = {
    isActive: false
  }

  target: HTMLElement

  render() {
    const { top, left } = this.state

    return (
      <div style={{ position: 'relative' }}>
        <ui.Trigger
          innerRef={c => (this.target = c)}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
          {this.props.children}
        </ui.Trigger>

        {!this.props.disabled &&
          this.state.isActive && (
            <Position offset={16} placement="left" target={() => this.target}>
              {({ top, left }) => (
                <ui.Wrapper top={top} left={left} role="tooltip">
                  {this.props.text} <ui.Arrow />
                </ui.Wrapper>
              )}
            </Position>
          )}
      </div>
    )
  }

  handleMouseEnter = (evt: MouseEvent) => {
    this.setState({
      isActive: true
    })
  }

  handleMouseLeave = (evt: MouseEvent) => {
    this.setState({
      isActive: false
    })
  }
}
