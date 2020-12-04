import React from 'react';
import { Switch, Route } from "react-router-dom";

// import local
import ScrollArrow from '../../components/includes/Scroll';

import Home from "../../components/Home/home";
import Footer from "../../components/Footer/footer";
import MentionsLegales from "../../components/MentionsLegales/mentionsLegales";
import ErrorPage from '../../components/includes/errorpage';
import PostContainer from "../Post/postContainer";
import EventContainer from "../Event/eventContainer";
//import LoginButton from '../../components/LoginButton/LoginButton';
import ProfileContainer from "../Profile/profileContainer"

import Nav from "../../components/includes/nav";

// import auth0
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "../../auth/protected-route";

// import local
import './App.scss';

//import material ui
import CircularProgress from '@material-ui/core/CircularProgress'

const App = () => {

  const { 
    isLoading,
  } = useAuth0();
  
  if (isLoading) {
    return <div><CircularProgress size={100}/></div>;
  }
  return (
    <div className="App">
    <ScrollArrow />
    <Nav/>              
      <Switch>
        <Route exact path="/" component={Home}  /> 
        {/* <Route exact path="/signup" component={Signup}  />   */}
        <Route exact path="/posts/:slug" component={PostContainer} /> 
        <Route exact path="/events/:slug" component={EventContainer} /> 
        <ProtectedRoute path="/profile" component={ProfileContainer} />
        <Route exact path="/mentionslegales" component={MentionsLegales} />  
        <Route component={ErrorPage} />
      </Switch>
    <Footer className="app-footer"/>     
    </div>
  );
}

export default App;
