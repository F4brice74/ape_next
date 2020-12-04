import React from "react";
import PrivatePosts from "../../components/parents/PrivatePosts/privatePosts";
import Query from "../../components/Query/query";
import PRIVATEPOSTS_QUERY from "../../queries/profile/privatePosts-query";

const PrivatePostsContainer = () => {
  return (
     
      <Query query={PRIVATEPOSTS_QUERY}>
        {({ data: { privatePosts } }) => {
          return <PrivatePosts privatePosts={privatePosts} />;
        }}
      </Query>
    
  );
};

export default PrivatePostsContainer;