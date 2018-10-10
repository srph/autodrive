import * as React from 'react'
import styled from 'styled-components'
import s from './styles'

const ui = {}
ui.Input = styled.input`
  display: block;
  width: 100%;
  padding: 24px;
  background: transparent;
  color: ${s['color-dirty-blue']};
  border: 1px solid ${s['color-silver']};
  border-radius: ${s['border-radius']}px;
  outline: 0;
  // transition: 100ms box-shadow ease;

  &:focus {
    box-shadow: 0 0 0 3px ${s['color-dark-silver']};
  }

  ::placeholder {
    color: ${s['color-dark-silver']};
  }
`

interface UiInputProps {
  id?: string
  placeholder?: string
  readonly?: boolean
  value: string
  autoFocus?: boolean
  onChange: (input: string) => void
  onPaste: (input: string) => void
  onFocus?: (evt: InputEvent) => void
}

export default class UiInput extends React.Component<UiInputProps> {
  input: HTMLInputElement

  componentDidMount() {
    if (this.props.autoFocus) {
      setTimeout(() => {
        // We need to delay the focus in next tick
        // because of the fade-in animation.
        this.input.focus()
      }, 0)
    }
  }

  render() {
    return (
      <ui.Input
        id={this.props.id}
        innerRef={c => (this.input = c)}
        readonly={this.props.readonly}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        onPaste={this.handlePaste}
      />
    )
  }

  handleFocus = (evt: InputEvent) => {
    if (this.props.readonly) {
      evt.target.select()
    }

    this.props.onFocus && this.props.onFocus(evt)
  }

  handleChange = (evt: InputEvent) => {
    this.props.onChange && this.props.onChange(evt.target.value)
  }

  handlePaste = (evt: Event) => {
    if (!this.props.onPaste) {
      return
    }

    // @source https://stackoverflow.com/a/30496488/2698227
    // common browser -> e.originalEvent.clipboardData
    // uncommon browser -> window.clipboardData
    const clipboardData: ClipboardEvent = evt.clipboardData || evt.originalEvent.clipboardData || window.clipboardData
    const pastedData: string = clipboardData.getData('text')
    this.props.onPaste(pastedData)
  }
}
