import Header from '../components/Header/header'
import Presentation from '../components/Presentation/presentation'
import Events from '../components/Events/events'
import PostHero, { POSTHERO_QUERY } from '../components/PostHero/postHero'
import Head from 'next/head'
import { getSession, useSession} from "next-auth/client";
import WithGraphQL from "../lib/with-graphql";

export default function Home() {
  const [session] = useSession();
  console.log (session)
  return (
    <>
      <Head>
        <title>APE des Villards/Thones</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Header />
      <Presentation />
      <WithGraphQL>
        <PostHero />
        <Events />
      </WithGraphQL>
    </>
  )
}
