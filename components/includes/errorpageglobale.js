import React from 'react';

import './error.scss';
import Grid from '@material-ui/core/Grid';


const ErrorPageGlobale = () => {
  return (
    <Grid
      container
      direction="column"
      className="errorTitle"
      justify="center"
      alignItems="center"
    >
      <h3>Désolé, une erreur est survenue</h3>
      <p>nous vous invitons à revenir à la page d'accueil ou à rafraichir votre page</p>
    </Grid>
  );
};


export default ErrorPageGlobale;
