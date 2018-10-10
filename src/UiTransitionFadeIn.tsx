import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const kf = {} as any
kf.fadeDownIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

kf.fadeUpIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const ui = {} as any
ui.Wrapper = styled.div`
  animation-name: ${(props: UiTransitionFadeInProps)  => (props.direction === 'up' ? kf.fadeUpIn : kf.fadeDownIn)};
  animation-duration: 1000ms;
  animation-timing-function: ease;
  animation-iteration-count: 1;
`

interface UiTransitionFadeInProps {
  direction?: 'up' | 'down'
  children: JSX.Element
}

const UiTransitionFadeIn: React.SFC<UiTransitionFadeInProps> = (props) => {
  return <ui.Wrapper direction={props.direction}>{props.children}</ui.Wrapper>
}

UiTransitionFadeIn.defaultProps = {
  direction: 'down'
}

export default UiTransitionFadeIn
