import gql from "graphql-tag";

const POSTHERO_QUERY = gql`
    query postHero {
      posts(sort: "createdAt:DESC", limit:1, where: {isPublished: "true"}) {
       id
       title
       content	
       excerpt
       isPublished
       slug
       createdAt
       image {
        url
      }
       }
     }
`;

export default POSTHERO_QUERY;