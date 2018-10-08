import * as React from 'react'
import styled from 'styled-components'
import s from './styles'

const ui = {}
ui.Wrapper = styled.div`
  margin-top: 32px;
  font-size: 12px;
  color: ${s['color-white']};
  padding: 8px;
  background: ${s['color-dark-silver']};
  border-radius: ${s['border-radius']}px;
`

ui.Label = styled.span`
  margin-right: 8px;
  display: inline-block;
  padding: 4px;
  /* Otherwise, the letter spacing would break the padding */
  padding-right: 2px;
  font-size: 10px;
  font-family: ${s['font-family-heading']};
  font-weight: 600;
  letter-spacing: 2px;
  background: ${s['color-silver']};
  user-select: none;
  text-transform: uppercase;
  border-radius: ${s['border-radius']}px;
`

interface TipState {
  activeTip: number
}

const tips = ['Better done than perfect.', "Don't forget to take a short break every now and then."]

export default class Tip extends React.Component<void, TipState> {
  state: TipState = {
    activeTip: this.getRandomTip()
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        activeTip: this.getRandomTip()
      })
    }, 7000)
  }

  render() {
    return (
      <ui.Wrapper>
        <ui.Label>Daily Tip</ui.Label>
        {tips[this.state.activeTip]}
      </ui.Wrapper>
    )
  }

  getRandomTip() {
    return Math.round(Math.random() * (tips.length - 1))
  }
}
