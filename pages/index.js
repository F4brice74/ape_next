import Header from '../components/Header/header'
import Presentation from '../components/Presentation/presentation'
import PostHero, { POSTHERO_QUERY } from '../components/PostHero/postHero'
import { initializeApollo } from "../lib/apolloClient"


import Head from 'next/head'




export default function Home() {

  return (     
      <main>
        <Header />
        <Presentation />
        <PostHero />
      </main>
  )
}
// export async function getServerSideProps(context) {
//   const session = await auth0.getSession(context.req);
//   return {
//     props: { user: session?.user || null, }, // will be passed to the page component as props
//   }
// }


// export async function getStaticProps() {


//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: POSTHERO_QUERY,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     revalidate: 1,
//   };
// }
