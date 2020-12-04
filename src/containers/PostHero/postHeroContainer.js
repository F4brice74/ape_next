import React from "react";

import Query from "../../components/Query/query";
import POSTHERO_QUERY from "../../queries/postHero/postHero-query";
import PostHero from "../../components/PostHero/postHero"


const PostHeroContainer = () => {
  
  return (
    <Query query={POSTHERO_QUERY}>
      {({ data: { posts} }) => { 
    return <PostHero postHero={posts} />;
      }}
    </Query>
   
  );
};

export default PostHeroContainer;


// return ( 
//   <div>
//    {postHero.map(thepostHero => ( 
//     <PostHero thepostHero={thepostHero} />      
//     ))}
//     </div>  
//   )