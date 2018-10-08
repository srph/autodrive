import * as React from 'react'
import styled from 'styled-components'
import s from './styles'

interface UiHeaderProps {
  children: string
}

const ui = {}
ui.Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
ui.Header = styled.h1`
  position: relative;
  display: inline-block;
  margin: 0;
  padding-top: 48px;
  padding-bottom: 48px;
  color: ${s['color-blue']};
  font-weight: 400;
  text-align: center;
  font-family: ${s['font-family-serif']};
  font-size: 48px;
`
ui.HeaderLine = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: calc(100% + 24px);
  background: ${s['color-black']};
  width: 48px;
  height: 2px;
`

export default function UiHeader({ children }: UiHeaderProps) {
  return (
    <ui.Wrapper>
      <ui.Header>
        {children}
        <ui.HeaderLine />
      </ui.Header>
    </ui.Wrapper>
  )
}
