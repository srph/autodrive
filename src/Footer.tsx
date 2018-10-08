import * as React from 'react'
import styled from 'styled-components'
import s from './styles'

const ui = {}
ui.Wrapper = styled.div`
  margin-top: 48px;
  font-family: ${s['font-family']};
  font-size: ${s['font-size']};
  background: ${s['color-light-silver']};
  text-align: center;
  color: ${s['color-dark-silver']};
  font-size: 12px;
  line-height: 1.5;

  a {
    color: ${s['color-dark-silver']};
  }
`

export default function UiFooter() {
  return (
    <ui.Wrapper>
      Made with 💖 by{' '}
      <a href="https://kierb.com" target="_blank">
        Kier Borromeo
      </a>. View{' '}
      <a href="https://github.com/srph/jayson" target="_blank">
        source code
      </a>.
      <br />
      Thanks to{' '}
      <a href="http://thebiobucket.blogspot.com/" target="_blank">
        Kay Chichini
      </a>{' '}
      for{' '}
      <a href="http://thebiobucket.blogspot.com/2011/10/how-to-link-to-google-docs-for-download.html" target="_blank">
        this blog post
      </a>.
    </ui.Wrapper>
  )
}
