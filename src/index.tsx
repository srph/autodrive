import * as React from 'react'
import { render } from 'react-dom'
import 'sanitize.css'
import UiContainer from './UiContainer'
import UiHeader from './UiHeader'
import UiField from './UiField'
import UiInput from './UiInput'
import UiTransitionFadeIn from './UiTransitionFadeIn'
import CopyButton from './CopyButton'
import UiButton from './UiButton'
import Tip from './Tip'
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
        <UiHeader>Autodrive</UiHeader>

        {!this.state.output.length && (
          <UiTransitionFadeIn>
            <UiField
              label="Enter Google Drive URL"
              actions={
                <UiTooltip text={this.getValidationErrorMessage()} disabled={isValid}>
                  <UiButton onClick={this.handleFormat} disabled={!isValid}>
                    Generate
                  </UiButton>
                </UiTooltip>
              }>
              <UiInput value={this.state.input} onChange={this.handleInputChange} onPaste={this.handleInputPaste} />
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
              ]}>
              <UiInput readonly value={this.state.output} />
            </UiField>
          </UiTransitionFadeIn>
        )}
        <Tip />
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
