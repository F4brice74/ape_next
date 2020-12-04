import React from 'react';
import ReactDOM from 'react-dom';
import App from "./containers/App/App";
import { BrowserRouter as Router } from "react-router-dom";

//import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { Auth0Provider } from "@auth0/auth0-react";
import ApolloWrapper from "./utils/ApolloWrapper";


// import local
import './index.css';

ReactDOM.render(
  <Router>
     <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      redirectUri={window.location.origin}
      scope="read:current_user update:current_user_metadata"
    >
      <ApolloWrapper>
        <App />
      </ApolloWrapper>
    </Auth0Provider>
  </Router>,
  
  document.getElementById('root')
);

