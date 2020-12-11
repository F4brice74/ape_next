import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";


const WithGraphQL = ({ session, children }) => {
 
  const token = "mPTCIRn9stD96BOSY6t2gkxicR3Wx6G3";
  console.log("token from with graphql", token)

  const client = new ApolloClient({
    uri:
      `${process.env.NEXT_PUBLIC_API_URL}/graphql` ||
      "https://apedesvillards.herokuapp.com/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default WithGraphQL;
