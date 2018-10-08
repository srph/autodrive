import * as React from 'react'
import styled from 'styled-components'
import s from './styles'

const ui = {}
ui.Input = styled.input`
  display: block;
  width: 100%;
  padding: 24px;
  background: transparent;
  border: 1px solid ${s['color-silver']};
  border-radius: ${s['border-radius']}px;
  outline: 0;
  // transition: 100ms box-shadow ease;

  &:focus {
    box-shadow: 0 0 0 3px ${s['color-dark-silver']};
  }
`

interface UiInputProps {
  id?: string
  readonly?: boolean
  value: string
  onChange: (input: string) => void
  onPaste: (input: string) => void
}

export default class UiInput extends React.Component<UiInputProps> {
  render() {
    return (
      <ui.Input
        id={this.props.id}
        readonly={this.props.readonly}
        value={this.props.value}
        onChange={this.handleChange}
        onPaste={this.handlePaste}
      />
    )
  }

  handleChange = evt => {
    this.props.onChange && this.props.onChange(evt.target.value)
  }

  handlePaste = evt => {
    if (!this.props.onPaste) {
      return
    }

    // @source https://stackoverflow.com/a/30496488/2698227
    // common browser -> e.originalEvent.clipboardData
    // uncommon browser -> window.clipboardData
    var clipboardData = evt.clipboardData || evt.originalEvent.clipboardData || window.clipboardData
    var pastedData = clipboardData.getData('text')
    this.props.onPaste(pastedData)
  }
}
