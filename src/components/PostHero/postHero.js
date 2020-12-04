import React from "react";
import PropTypes from 'prop-types';

import ReactHtmlParser from 'react-html-parser';
import Moment from 'react-moment';
import ScrollAnimation from 'react-animate-on-scroll';


// import material ui
import {
    Grid,
} from '@material-ui/core'

// import local
import "./postHero.scss"

const PostHero = ({ postHero }) => {
    const post = postHero[0]

    // console.log("postHero", post)

    return (
        <Grid
            container
            direction="row"
            justify="center"
            className="container"
        >
            <Grid item xs={12}>
                <img src={require('../../assets/img/wave2.svg')} alt="separation" className="postHero-separation" />
            </Grid>
            <Grid
                item container
                xs={12}
                justify="center"
                alignItems="center"
                className="postHero-base"
            >
                <Grid item container alignItems="center" justify="center" xs={10} md={7}>
                    <Grid item xs={12}>
                        <ScrollAnimation animateIn="bounceIn" duration={0.5}>
                            <h2>Dernière actu</h2>
                        </ScrollAnimation>
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <img className="post-image" src={post.image.url} alt="reference" />
                    </Grid>
                    <Grid item container alignItems="center" xs={10} md={8}>
                        <Grid item align="left" xs={12} className="post-grid">
                            <p className="post-title">{post.title}</p>
                            <p className="post-date"><Moment format="DD/MM/YYYY">{post.createdAt}</Moment></p>
                        </Grid>

                        <Grid item xs={12}>
                        <ScrollAnimation animateIn="fadeInUp" duration={0.5} >
                            <div className="post-content">  {ReactHtmlParser(post.content)}</div>
                            </ScrollAnimation>
                        </Grid>


                    </Grid>

                </Grid>

            </Grid>
            <Grid item xs={12}>
                <img src={require('../../assets/img/wave2.svg')} alt="separation" className="postHero-separation-2" />
            </Grid>

        </Grid>



    );
}

export default PostHero;

PostHero.propTypes = {
    title: PropTypes.string
}