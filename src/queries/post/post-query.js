import gql from "graphql-tag";

const POST_QUERY = gql`
    query posts($slug: String!) {
            posts (where: {slug: $slug}) {
             id
             slug
             title
             content	
             excerpt
             isPublished
             }
           }
`;

export default POST_QUERY;