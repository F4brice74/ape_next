import React from 'react';

import styles from './error.module.scss';
import Grid from '@material-ui/core/Grid';


const ErrorPage = ({ErrorMessage}) => {
  return (
    <Grid
      container
      direction="column"
      className={styles.errorTitle}
      justify="center"
      alignItems="center"
    >
      <h3>Désolé, mais nous avons rencontré une erreur</h3>
      <p>{ErrorMessage}</p>
      <h3>nous vous invitons à revenir à la page d'accueil</h3>
    </Grid>
  );
};


export default ErrorPage;
