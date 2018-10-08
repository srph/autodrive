import * as React from 'react'
import styled from 'styled-components'
import s from './styles'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import { Controlled as CodeMirror } from 'react-codemirror2'
import * as utils from './utils'

interface UiCodeEditorProps {
  value: string
  autodetectLanguage: boolean
  autoFocus?: boolean
  onAutoFormat?: (value: string) => void
  onChange?: (value: string) => void
  onPaste?: () => void
  innerRef?: (c: JSX.Element) => any
}

const ui = {}
ui.Wrapper = styled.div`
  font-family: ${s['font-family-monospace']};
`

class UiCodeEditor extends React.Component<UiCodeEditorProps, void> {
  static defaultProps = {
    autodetectLanguage: true
  }

  pasted: boolean = false

  getLanguage(): string {
    if (!this.props.autodetectLanguage) {
      return 'plaintext'
    }

    if (utils.isHtml(this.props.value)) {
      return 'htmlmixed'
    }

    return 'plaintext'
  }

  render() {
    return (
      <ui.Wrapper>
        <CodeMirror
          value={this.props.value}
          onBeforeChange={this.handleBeforeChange}
          onPaste={this.handlePaste}
          options={{
            mode: this.getLanguage(),
            theme: 'monokai',
            lineNumbers: true
          }}
          className="ui-json-editor"
        />
      </ui.Wrapper>
    )
  }

  handleBeforeChange = (editor, data, value: string) => {
    if (this.pasted) {
      this.pasted = false
      this.props.onPaste && this.props.onPaste(value)
      return
    }

    this.props.onChange && this.props.onChange(value)
  }

  // @TODO:
  // If all contents were replaced, we'll scroll down to next field
  handlePaste = (editor, evt) => {
    this.pasted = true
  }
}

export default UiCodeEditor
