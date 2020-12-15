import React from "react";
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';
import { gql, useQuery, NetworkStatus } from '@apollo/client'
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link'
import ErrorPage from "../utils/errorpage"

// import material ui

import {
    Grid,
} from '@material-ui/core'

// import query
const EVENTS_QUERY = gql`
query events {
  events(sort: "dateEvent:ASC", where: {isPublished: "true"}) {
  id
  title
  content	
  excerpt
  isPublished
  slug
  dateEvent
    image {
    url
  }
  }
}
`;


//import locaux
import styles from "./events.module.scss"



const Events = () => {

    const { loading, error, data } = useQuery(EVENTS_QUERY);
    if (error)
    if (error) return <ErrorPage ErrorMessage={error.message} />;
    if (loading) return <span className="loader"></span>;

  const events = data.events;
  

    return (

        <Grid
            container
            direction="row"
            justify="center"
            className="container2"
            id="evenements"
        >
            <Grid item xs={12} align="center">
                <ScrollAnimation animateIn="bounceIn" duration={0.5}  >
                    <h2>Nos événements</h2>
                </ScrollAnimation>

            </Grid>
            <Grid item container justify="space-evenly" xs={8}>

                {events.map(event => (

                    <Grid item xs={10} sm={3} md={3} lg={3} className={styles.box} key={event.title}>
                        <Link href={`/events/${event.slug}`} >
                        <a>
                               <div className={styles.figure}>
                                <img src={event.image.url} alt={event.image.name}/>
                                <div className={styles.caption}>
                                    <div className={styles.about}>
                                        <h2>{event.title}</h2>
                                    </div>
                                </div>
                            </div>
                            </a> 
                        </Link> 
                    </Grid> 
                   
                ))}
            </Grid>
        </Grid>
    )
};

export default Events;

Events.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string
}