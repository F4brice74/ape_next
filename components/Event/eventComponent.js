import React from "react";
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import ErrorPage from "../utils/errorpage"
import { gql, useQuery, NetworkStatus } from '@apollo/client'



// import material ui

import {
    Grid,
} from '@material-ui/core'

// import animation


//import locaux
import styles from "./event.module.scss"

const EVENT_QUERY = gql`
    query event($slug: String!) {
            events (where: {slug: $slug}) {
             id
             slug
             title
             content	
             excerpt
             isPublished
             image {
               url
              }
             }
           }
`;



const EventComponent = ({ slug }) => {
    //console.log(event)
    const { loading, error, data } = useQuery(EVENT_QUERY, {
        variables: { slug: slug },
      });
    if (error)
    if (error) return <ErrorPage ErrorMessage={error.message} />;
    console.log(error)
    if (loading)
      return <span className="loader"></span>;
    const eventShow = data.events[0];
    

    return (
        <Grid
            container
            direction="row"
            justify="center"
            className={styles.event_background}
        >
            <Grid item container xs={12} alignItems="center" className={styles.event_header_base}>
                          <Grid item align="center" xs={12}>
                <div className={styles.event_title}>{eventShow.title}</div>
                </Grid>
            </Grid>
           
            <Grid item container xs={12} md={10} className={styles.event_content}>
                <Grid item xs={12} md={4}>
                    <img className={styles.event_img} src={eventShow.image.url} alt={eventShow.image.name} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <div className={styles.event_p} >{ReactHtmlParser(eventShow.content)}</div>
                </Grid>
            </Grid>
        </Grid>

    )
};

export default EventComponent;

