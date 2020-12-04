import gql from "graphql-tag";

const POSTS_QUERY = gql`
    query posts {
            posts {
             id
             title
             content	
             excerpt
             isPublished
             slug
             }
           }
`;

export default POSTS_QUERY;