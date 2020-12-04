import React from "react";
import Profile from "../../components/Profile/profile";
import Query from "../../components/Query/query";
import { useAuth0 } from "@auth0/auth0-react";
import USERME_QUERY from "../../queries/profile/userMe-query";



const ProfileContainer = () => {
  const { user } = useAuth0();
  const id = user.sub.replace('auth0|', '')
  //console.log(id)
  return (
    <div>   
      <Query query={USERME_QUERY} id={id}>
        {({ data: { users, commissions, documents } }) => {
          return <Profile strapiUsers={users} commissions={commissions} documents={documents}/>;
        }}
      </Query>
     
    </div>
  );
};

export default ProfileContainer;

