import { useMemo, useState, useEffect } from "react";
import { ApolloClient, HttpLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import auth0 from './auth0';

let apolloClient;



function createApolloClient() {
  const [bearerToken, setBearerToken] = useState("");
  const backendUrl = process.env.BACKEND_URL
  const httpLink = createHttpLink({
    uri:"https://apedesvillards.herokuapp.com/graphql"
  });

  useEffect(() => {
    const getToken = async (req, res) => {
      const tokenCache = auth0.tokenCache(req, res);
      const { accessToken } = await tokenCache.getAccessToken();
      setBearerToken(accessToken);
     
    };
    getToken();
    
  }, []);


  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    
    //const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: bearerToken ? `Bearer ${bearerToken}` : "",
      }
    }
  });
  
    return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState) {
      // Get existing cache, loaded during client side data fetching
      const existingCache = _apolloClient.extract();

      // Restore the cache using the data passed from
      // getStaticProps/getServerSideProps combined with the existing cached data
      _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
  }
  export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
  }