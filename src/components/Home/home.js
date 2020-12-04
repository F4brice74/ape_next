import React from "react";
import CookieConsent from 'react-cookie-consent';
import PostHeroContainer from "../../containers/PostHero/postHeroContainer"
import EventsContainer from "../../containers/Events/eventsContainer"
import Presentation from "../../components/Presentation/presentation"
import Header from "../../components/Header/header"


import "./home.scss"


function Home() {


  return (

    <section id="home">
   
      <CookieConsent
        location="bottom"
        buttonText="j'ai compris"
        cookieName="apookie"
        style={{ background: '#5B9BD5', fontFamily: 'roboto', fontSize: '13px' }}
        buttonStyle={{ background: '#EF7A1B', color: 'white', fontSize: '13px' }}
        expires={150}
      >
        Ce site utilise des "cookies" pour une meilleure expérience utilisateur. Ces "cookies" sont utilisés à des fins statistiques{' '}
      </CookieConsent>
      <Header />
      <Presentation />
      <PostHeroContainer />
      <EventsContainer />
      
    </section>


  );
}

export default Home;