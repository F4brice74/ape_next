import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";


const WithGraphQL = ({ session, children }) => {
 //console.log("session from graphql", session)
  const token = session ? session.user.accessToken : '';
  //console.log("token from with graphql", token)

  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql` || "http://localhost:1337/graphql",
    credentials: "include",
    fetchOptions: {
      mode: 'no-cors',
    },
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
    cache: new InMemoryCache(),
    
    
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default WithGraphQL;

// ${process.env.NEXT_PUBLIC_API_URL}/graphql` ||
