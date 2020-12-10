import { useMemo, useState, useEffect } from "react";
import { ApolloClient, HttpLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { useAuth } from 'use-auth0-hooks';
let apolloClient;




function createApolloClient() {
  const [bearerToken, setBearerToken] = useState("");
  const { isAuthenticated, isLoading, accessToken } = useAuth({
    audience: 'https://apedesvillardssurthones.eu.auth0.com/api/v2/',
  });
    useEffect(() => {
  const getToken = async () => {
    const token = isAuthenticated ? await accessToken() : "";
    setBearerToken(token);
  };
  getToken();
}, [accessToken, isAuthenticated])

  //const backendUrl = process.env.BACKEND_URL
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: bearerToken ? `Bearer ${bearerToken}` : "",
      }
    }
  });



  
  const httpLink = createHttpLink({
    uri:"https://apedesvillards.herokuapp.com/graphql",
  });
      
  
  
    return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
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