import gql from "graphql-tag";

const PRIVATEPOSTS_QUERY = gql`
    query privatePosts {
            privatePosts {
             id
             title
             content
             createdAt	
                
             }
           }
`;

export default PRIVATEPOSTS_QUERY;