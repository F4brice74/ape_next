import React from "react";
import Head from "next/head";
import ProfileComponent from '../components/ProfileComponent'
import { getSession, signIn } from "next-auth/client";
import WithGraphQL from "../lib/with-graphql";

import {
  Button,
  Grid,
} from '@material-ui/core'

import { gql, useQuery, NetworkStatus } from '@apollo/client'

const apeMembres = ({ session, jwt }) => {
  if (!session) {
    return <Grid container direction="row" justify="center" alignItems="center">
      <Grid item align="center" xs={8}>
       <h3>vous devez être connectés</h3> 
      </Grid>
      <Grid item align="center" xs={8}>
      <Button onClick={signIn}>se connecter</Button> 
      </Grid>
    </Grid>
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
