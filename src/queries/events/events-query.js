import gql from "graphql-tag";

const EVENTS_QUERY = gql`
query events {
  events(sort: "dateEvent:ASC", where: {isPublished: "true"}) {
  id
  title
  content	
  excerpt
  isPublished
  slug
  dateEvent
    image {
    url
  }
  }
}
`;

export default EVENTS_QUERY;