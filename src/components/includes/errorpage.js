import React from 'react';

import './error.scss';
import Grid from '@material-ui/core/Grid';


const ErrorPage = () => {
  return (
    <Grid
      container
      direction="column"
      className="errorTitle"
      justify="center"
      alignItems="center"
    >
      <h3>Désolé, mais la page demandée n'existe pas.</h3>
      <p>nous vous invitons à revenir à la page d'accueil</p>
    </Grid>
  );
};


export default ErrorPage;
