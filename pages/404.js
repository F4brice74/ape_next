// pages/404.js

import React from 'react';
import Grid from '@material-ui/core/Grid';


const Custom404 = () => {
    
    return (
       <Grid
    container
    direction="column"
    className="container"
    justify="center"
    alignItems="center"
  >
    <h3>Désolé, une erreur est survenue</h3>
    <p>la page demandée n'existe pas, nous vous invitons à revenir à la page d'accueil</p>
  </Grid>  
    )
  }

  export default Custom404
