import gql from "graphql-tag";

const USERME_QUERY = gql`
query user($id: String!) {
    users (where: {id: $id}) {
    id
	firstname
	lastname
	username
    email
    phoneNumber
     role {
      name
      }
    commissions {
        name
    }
    }
    commissions {
              id
              name
              content
              users_permissions_users {
                  id
                  lastname
                  firstname
                  email
              }
          }
    documents {
        id
        title
                 file {
                     name
                     url
                 }       
        }    
    }
    
`;

export default USERME_QUERY;