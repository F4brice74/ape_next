import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";


const WithGraphQL = ({ session, children }) => {
 
  const token = session ? session.user.accessToken : '';
  //console.log("token from with graphql", token)

  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql` || "http://localhost:1337/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default WithGraphQL;

// ${process.env.NEXT_PUBLIC_API_URL}/graphql` ||
