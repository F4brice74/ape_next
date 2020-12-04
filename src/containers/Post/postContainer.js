import React from "react";
import { useParams } from "react-router";
import Query from "../../components/Query/query";
import POST_QUERY from "../../queries/post/post-query";
import Post from "../../components/Post/post"

const PostContainer = () => {
  let  { slug } = useParams();
  // console.log({ slug })
  return (
    <Query query={POST_QUERY} id={slug}>
      {({ data: { posts } }) => {
        //const imageUrl = post.image.url;
        return (  
          <div>
         {posts.map(thepost => ( 
          <Post thepost={thepost} key={thepost.id} />      
          ))}
          </div>       
              
        );
      }}
    </Query>
  );
};

export default PostContainer;