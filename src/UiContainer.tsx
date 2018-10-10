import * as React from 'react'
import styled from 'styled-components'
import s from './styles'

const ui = {}
ui.Wrapper = styled.div`
  font-family: ${s['font-family']};
  font-size: ${s['font-size']};
  background: ${s['color-light-silver']};
  color: ${s['color-dirty-blue']};
  min-height: 100vh;
`

ui.Bg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  width: 100%;
  opacity: 0.5;
  background-repeat: repeat;
  background-image:  url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238898aa' fill-opacity='0.37'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");;
  z-index: 499;
`

ui.BgGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  width: 100%;
  background: linear-gradient(0deg, ${s['color-light-silver']}, rgba(0,0,0,0));
`

ui.Container = styled.div`
  position: relative;
  padding: 48px 16px;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  z-index: 500;
`

export default function Container({ children }) {
  return (
    <ui.Wrapper>
      <ui.Bg>
        <ui.BgGradient />
      </ui.Bg>
      <ui.Container>{children}</ui.Container>
    </ui.Wrapper>
  )
}
