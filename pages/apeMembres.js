import React from "react";
import Head from "next/head";
import ProfileComponent from '../components/ProfileComponent'
import { getSession } from "next-auth/client";
import WithGraphQL from "../lib/with-graphql";

import { gql, useQuery, NetworkStatus } from '@apollo/client'

const apeMembres = ({ session, jwt }) => {
  if (!session) {
    return <h1>faut se connecter</h1>;
  }
console.log("session from profile", session)
console.log("jwt from profile", jwt)
  return (
    <WithGraphQL session={session}>
      <Head>
        <title>espace membre</title>
      </Head>
      <ProfileComponent />
    </WithGraphQL>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default apeMembres;
