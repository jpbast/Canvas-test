import { AppProps } from 'next/dist/next-server/lib/router/router'
import { BlocksProvider } from '../contexts/BlocksContext'

import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../styles/global'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BlocksProvider>
        <Component {...pageProps} />
      </BlocksProvider>
    </ThemeProvider>
  )
}

export default MyApp
