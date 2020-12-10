
import { useState, useEffect} from 'react';
import withApollo from 'next-with-apollo';
import { setContext } from '@apollo/client/link/context';
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloProvider,
  } from "@apollo/client";
import { useAuth } from 'use-auth0-hooks';

export default withApollo(
  ({ initialState }) => {
    
    const { isAuthenticated, isLoading, accessToken } = useAuth({
        audience: 'https://apedesvillardssurthones.eu.auth0.com/api/v2/',
      });
    const [bearerToken, setBearerToken] = useState("");
    const backendUrl = process.env.REACT_APP_BACKEND_URL
    const httpLink = new HttpLink({
      uri:"https://apedesvillards.herokuapp.com/graphql",
      //uri: "http://localhost:1337/graphql",
      credentials: 'include'
    });
  
     
    console.log("accessToken from with apollo", accessToken)
    
    const authLink = setContext((_, { headers }) => {
     return {    
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accesstoken}` : "",
        },
        
      };
    });
    console.log("authlink", authLink)


    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);