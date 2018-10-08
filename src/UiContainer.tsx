import * as React from 'react'
import styled from 'styled-components'
import s from './styles'

const ui = {}
ui.Wrapper = styled.div`
  font-family: ${s['font-family']};
  font-size: ${s['font-size']};
  background: ${s['color-light-silver']};
  min-height: 100vh;
`

ui.Container = styled.div`
  padding: 48px 16px;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
`

export default function Container({ children }) {
  return (
    <ui.Wrapper>
      <ui.Container>{children}</ui.Container>
    </ui.Wrapper>
  )
}
