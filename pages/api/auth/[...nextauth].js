import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {

  // Configure one or more authentication providers
  providers: [
    Providers.Auth0({
      clientId: 'EMvEjQCs1Tu2ybmjBogv868dwfJHishn',
      clientSecret: 'SPI9ckg0Tv0FAmvajwWx3TIV3PaLwbgCUehGhcjIIhkT0ocTDRWgHTUxdCOyRsIP',
      domain: 'apedesvillardssurthones.eu.auth0.com'
    })
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL,
  // session: {
  //   jwt: true,
  // },
  debug: true,

  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (account) {
        token.id = account.id
        token.accessToken = account.accessToken
      }
      return Promise.resolve(token)
    },
    // jwt: async (token, account) => {    
    //     token.accessToken = account.accessToken    
    //   return Promise.resolve(token)
    // },
    session: async (session, user  ) => {
      session.user.accessToken = user.accessToken;
      session.user.id = user.id;
      // session.user.id = 'acounr';
      // session.user.accessToken = 'accessToken';
      return Promise.resolve(session)
    },
  }
  // async jwt(token, account) {
  //   if (account) {
  //     token.id = account.id
  //     token.accessToken = account.accessToken
  //   }
  //    return token
  // },
  // async session(session, user) {
  //   session.user = user
  //   return session
  // }
};

export default (req, res) => NextAuth(req, res, options)