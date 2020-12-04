import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

function ApolloWrapper({ children }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [bearerToken, setBearerToken] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const httpLink = new HttpLink({
    uri:`${backendUrl}/graphql`,
    //uri: "http://localhost:1337/graphql",
    credentials: 'include'
  });

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : "";
      setBearerToken(token);
     
    };
    getToken();
    
  }, [getAccessTokenSilently, isAuthenticated]);
  //console.log("token from wrapper", bearerToken)
  const authLink = setContext((_, { headers }) => {
   return {    
      headers: {
        ...headers,
        authorization: bearerToken ? `Bearer ${bearerToken}` : "",
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
