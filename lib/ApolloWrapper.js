import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from 'use-auth0-hooks';
function ApolloWrapper({ children }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { accessToken } = useAuth({
    audience: 'https://apedesvillardssurthones.eu.auth0.com/api/v2/',
  });
  
  const [bearerToken, setBearerToken] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const httpLink = new HttpLink({
    uri:"https://apedesvillards.herokuapp.com/graphql",
    //uri: "http://localhost:1337/graphql",
    credentials: 'include'
  });

  
  
console.log("accesstoken form wrapper", accessToken)
  const authLink = setContext((_, { headers }) => {
   return {    
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      
    };
  });
  //console.log("authlink", authLink)
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloWrapper;
