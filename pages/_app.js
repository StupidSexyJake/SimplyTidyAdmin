// React and Next.js
import '../src/bootstrap'
import React from 'react'
import App, { Container } from 'next/app'
import getPageContext from '../src/getPageContext'
// State provider
import { Provider } from '../state/store'
// Material UI
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider>
          {/* Wrap every page in Styles and Theme providers */}
          <StylesProvider
            generateClassName={this.pageContext.generateClassName}
            sheetsRegistry={this.pageContext.sheetsRegistry}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* ThemeProvider makes the theme available down the React
              tree thanks to React context. */}
            <ThemeProvider theme={this.pageContext.theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
              <Component pageContext={this.pageContext} {...pageProps} />
            </ThemeProvider>
          </StylesProvider>
        </Provider>
      </Container>
    );
  }
}

export default MyApp;