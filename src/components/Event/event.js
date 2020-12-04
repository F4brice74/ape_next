import React from "react";
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';




// import material ui

import {
    Grid,
} from '@material-ui/core'

// import animation


//import locaux
import "./event.scss"



const Event = ({ event }) => {
    //console.log(event)
    const eventShow = event[0]

    return (
        <Grid
            container
            direction="row"
            justify="center"
            className="event-background"
        >
            <Grid item container xs={12} alignItems="center" className="event-header-base">
                          <Grid item xs={12}>
                <div className="event-title">{eventShow.title}</div>
                </Grid>
            </Grid>
           
            <Grid item container xs={12} md={10} className="event-content">
                <Grid item xs={12} md={4}>
                    <img className="event-img" src={eventShow.image.url} alt={eventShow.image.name} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <div className="event-p" >{ReactHtmlParser(eventShow.content)}</div>
                </Grid>
            </Grid>
        </Grid>

    )
};

export default Event;

Event.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string
}