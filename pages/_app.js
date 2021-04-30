import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
// import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import createCache from '@emotion/cache';
import theme from '../src/theme/main';
import Layout from '../layout';
import '../styles/globals.css';

export const cache = createCache({ key: 'css', prepend: true });

function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
  );
}


export const getStaticProps = () => {
  console.log("static props running")
  return {
    props: {}
  }
}

export default MyApp;