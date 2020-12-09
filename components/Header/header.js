import React from "react";


// import local 
import styles from "./header.module.scss"


// import material ui
import Grid from '@material-ui/core/Grid';


const Header = () => {

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item container xs={12} className={styles.header_base} justify="center">
                <Grid item xs={12} md={4} >
                    <h1>Association<br />de Parents d'Elèves</h1>
                    <p className={styles.header_paragraphe}>de l'école Publique des Villards/Thônes</p>
                </Grid>

                <Grid item md={4} >
                    <img src='/images/LogoAPE400.png' alt="logoAPE" className={styles.header_logo} />

                </Grid>


            </Grid>
            <Grid item xs={12}>
                <img src='/images/wave1.svg' alt="separation" className={styles.header_separation} />

            </Grid>


        </Grid>
    );
}

export default Header;



