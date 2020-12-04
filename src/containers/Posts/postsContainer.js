import React from "react";
import Posts from "../../components/Posts/posts";
import Query from "../../components/Query/query";
import POSTS_QUERY from "../../queries/posts/posts-query";

const PostsContainer = () => {
  return (
    <div>   
      <Query query={POSTS_QUERY}>
        {({ data: { posts } }) => {
          return <Posts posts={posts} />;
        }}
      </Query>
    </div>
  );
};

export default PostsContainer;