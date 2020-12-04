import React from "react";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PropTypes from 'prop-types';

// import material ui
import {
    Grid,
} from '@material-ui/core'


// import local
import "./document.scss"


const Document = ({documents}) => {


    return (
        <Grid
            container
            direction="row"
            justify="center"
            className="container"
        >
            <Grid item container alignItems="center" xs={10} md={8} align="left">
            <h5>Les documents de l'APE</h5>
                <Grid item align="left" xs={12}>
                    
                    {documents.map(document => (
                        <div className="document_div"><a target="blank" href={document.file.url}><PictureAsPdfIcon fontSize="large" color="primary" className="icon"/></a><p> {document.title}</p>      
                        </div>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Document;

