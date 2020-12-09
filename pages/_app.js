import '../styles/globals.scss';
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
//import { useFetchUser } from '../lib/user'
import Layout from '../components/layout'
import { Auth0Provider } from 'use-auth0-hooks';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);


  return (
    <Auth0Provider
      domain='apedesvillardssurthones.eu.auth0.com'
      clientId='dyY7StjnwxljXo1euywEo2X3gmV29PbM'
      //audience={process.env.AUTH0_AUDIENCE}
      redirectUri="http://localhost:3000"
      //scope="read:current_user update:current_user_metadata"
    >
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} /> 
        </Layout>     
      </ApolloProvider>
    </Auth0Provider>


  )
}

export default MyApp
