import gql from "graphql-tag";

const EVENT_QUERY = gql`
    query event($slug: String!) {
            events (where: {slug: $slug}) {
             id
             slug
             title
             content	
             excerpt
             isPublished
             image {
               url
              }
             }
           }
`;

export default EVENT_QUERY;