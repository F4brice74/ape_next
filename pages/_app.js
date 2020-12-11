import '../styles/globals.scss';
import { Provider as NextAuthProvider } from "next-auth/client";
import Layout from '../components/layout'


function App({ Component, pageProps }) {
  const { session } = pageProps;

  return (

    <NextAuthProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextAuthProvider>


  )
}

export default App