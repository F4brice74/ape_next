import React from "react";
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'react-moment';
import { useSession } from "next-auth/client";
import { gql, useQuery, NetworkStatus } from '@apollo/client'
import ErrorPage from "../../utils/errorpage"
// import material ui
import {
     Grid,
} from '@material-ui/core'


// import local
import styles from "./privatePosts.module.scss"

const PRIVATEPOSTS_QUERY = gql`
    query privatePosts {
            privatePosts {
             id
             title
             content
             createdAt	
                
             }
           }
`;


const backendUrl = process.env.REACT_APP_BACKEND_URL


const PrivatePosts = () => {
    
    //console.log("privatePosts", privatePosts)
    const { loading, error, data } = useQuery(PRIVATEPOSTS_QUERY);
    if (error) return <ErrorPage ErrorMessage={error.message} />;
    if (loading) return <span className="loader"></span>;
    const privatePosts = data.privatePosts
    //console.log(privatePosts)
    const sortprivatePosts = privatePosts.slice().sort((a,b)=> (a.createdAt < b.createdAt)?1:-1)
 
    return (
        <Grid
            container
            direction="row"
            justify="center"
            className="container"
        >
 
 {sortprivatePosts.map(privatePost => (

     <Grid item container alignItems="center" xs={10} md={8} align="left" key={privatePost.id} className={styles.privatepost_block}>
                <Grid item align="left" xs={12}>
                    <div className={styles.privatepost_title}>{privatePost.title}</div>
                    <div className={styles.privatepost_content}><Moment format="DD/MM/YYYY">{privatePost.createdAt}</Moment></div>
                </Grid>
                <Grid item xs={12}>
                    <div className={styles.privatepost_paragraph}>{ReactHtmlParser(privatePost.content)}</div>
                </Grid>
            </Grid>
       
 ))}
     </Grid>        
    );
}

export default PrivatePosts;
