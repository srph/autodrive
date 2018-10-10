import * as React from 'react'
import { render } from 'react-dom'
import 'sanitize.css'
import './fonts/inter-ui/style.css'
import UiContainer from './UiContainer'
import UiHeader from './UiHeader'
import UiField from './UiField'
import UiInput from './UiInput'
import UiTransitionFadeIn from './UiTransitionFadeIn'
import CopyButton from './CopyButton'
import UiButton from './UiButton'
import Footer from './Footer'
import UiTooltip from './UiTooltip'
import * as utils from './utils'

interface AppState {
  input: string
  output: string
}

class App extends React.Component<void, AppState> {
  state: AppState = {
    input: '',
    output: ''
  }

  outputField?: JSX.Element

  getValidationErrorMessage = () => {
    if (!this.state.input.length) {
      return 'Please enter an input.'
    }

    if (!utils.isValidGdriveUrl(this.state.input)) {
      return 'Please enter a valid Google Drive URL.'
    }

    return ''
  }

  render() {
    const isValid = this.state.input.length && utils.isValidGdriveUrl(this.state.input)

    return (
      <UiContainer>
        <UiHeader subline="Generate direct-download links from a Google Drive URL.">Autodrive</UiHeader>

        {!this.state.output.length && (
          <UiTransitionFadeIn>
            <UiField
              label="Enter Google Drive URL"
              actions={
                <UiTooltip text={this.getValidationErrorMessage()} disabled={isValid}>
                  <UiButton onClick={this.handleGenerate} disabled={!isValid}>
                    Generate
                  </UiButton>
                </UiTooltip>
              }
              tooltip="Copy your shareable link either from the desktop version or on the drive.google.com version."
              id="input">
              <UiInput
                placeholder="Paste file url here (e.g., https://drive.google.com/file/u/1/d/0B60b9LKpHsoAVUdOa29YY2dNLVJsRTh02Eo560foUkFgYzc4/view?usp=sharing&export=download)"
                value={this.state.input}
                onChange={this.handleInputChange}
                onPaste={this.handleInputPaste}
              />
            </UiField>
          </UiTransitionFadeIn>
        )}

        {Boolean(this.state.output.length) && (
          <UiTransitionFadeIn direction="up">
            <UiField
              label="Output"
              actions={[
                <UiButton preset="clear" onClick={this.handleReset}>
                  Reset
                </UiButton>,
                <CopyButton text="Output" value={this.state.output}>
                  Copy
                </CopyButton>
              ]}
              tooltip="Don't forget to give permissions to anyone with the link!"
              id="output">
              <UiInput readonly autoFocus value={this.state.output} />
            </UiField>
          </UiTransitionFadeIn>
        )}

        <Footer />
      </UiContainer>
    )
  }

  handleGenerate = () => {
    this.setState({
      output: utils.generateAutodownloadUrl(this.state.input)
    })
  }

  handleReset = () => {
    this.setState({
      input: '',
      output: ''
    })
  }

  handleInputChange = (input: string) => {
    this.setState({
      input
    })
  }

  handleInputPaste = (input: string) => {
    this.setState({
      input,
      output: utils.isValidGdriveUrl(input) ? utils.generateAutodownloadUrl(input) : ''
    })
  }
}

render(<App />, document.getElementById('root'))
