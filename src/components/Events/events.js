import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';


// import material ui

import {
    Grid,
} from '@material-ui/core'

// import animation


//import locaux
import "./events.scss"



const Events = ({ events }) => {


    return (

        <Grid
            container
            direction="row"
            justify="center"
            className="container2"
            id="evenements"
        >
            <Grid item xs={12}>
                <ScrollAnimation animateIn="bounceIn" duration={0.5} >
                    <h2>Nos événements</h2>
                </ScrollAnimation>

            </Grid>
            <Grid item container justify="space-evenly" xs={8}>

                {events.map(event => (

                    <Grid item xs={10} md={3} lg={3} className="box" key={event.title}>
                        <Link to={`/events/${event.slug}`} >
                               <div className="figure">
                                <img src={event.image.url} alt={event.image.name}/>
                                <div className="caption">
                                    <div className="about">
                                        <h2>{event.title}</h2>
                                    </div>
                                </div>
                            </div>
                          
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