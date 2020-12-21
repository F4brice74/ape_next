import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
 
  // Configure one or more authentication providers
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    })
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL,
  // session: {
  //   jwt: true,
  // },
  debug: true,

  session: {
     
  // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 2 * 24 * 60 * 60, // 2 days

  },

  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (account) {
        token.id = account.id
        token.accessToken = account.accessToken
      }
      return Promise.resolve(token)
    },
   
    session: async (session, user  ) => {
      session.user.accessToken = user.accessToken;
      session.user.id = user.id;
      return Promise.resolve(session)
    },
  }
};

export default (req, res) => NextAuth(req, res, options)