import React from 'react';
import App, { AppProps, AppContext } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import {
  grayDark,
  slateDark,
  slateDarkA,
  blueDark,
  redDark,
  greenDark,
  whiteA,
  blackA
} from "@radix-ui/colors";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: linear-gradient(165deg, #03040d, #212534);
    background-attachment: fixed;
  }
`;

const theme = {
  colors: {
    ...grayDark,
    ...slateDark,
    ...slateDarkA,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...whiteA,
    ...blackA,
  },
};

class MyApp extends App {
  static async getInitialProps(appContext: AppContext) {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
