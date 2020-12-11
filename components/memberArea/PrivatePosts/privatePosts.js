import React from "react";
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'react-moment';

// import material ui
import {
     Grid,
} from '@material-ui/core'


// import local
import "./privatePosts.scss"

const backendUrl = process.env.REACT_APP_BACKEND_URL


const PrivatePosts = ({ privatePosts }) => {
    
    //console.log("privatePosts", privatePosts)

    return (
        <Grid
            container
            direction="row"
            justify="center"
            className="container"
        >
 {privatePosts.map(privatePost => (

     <Grid item container alignItems="center" xs={10} md={8} align="left" key={privatePost.id} className="privatepost-block">
                <Grid item align="left" xs={12}>
                    <div className="privatepost-title">{privatePost.title}</div>
                    <div className="privatepost-content"><Moment format="DD/MM/YYYY">{privatePost.createdAt}</Moment></div>
                </Grid>
                <Grid item xs={12}>
                    <div>{ReactHtmlParser(privatePost.content)}</div>
                </Grid>
            </Grid>
       
 ))}
     </Grid>        
    );
}

export default PrivatePosts;

PrivatePosts.propTypes = {
    title: PropTypes.string
}