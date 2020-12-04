import React from "react";


// import local 
import "./header.scss"


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
            <Grid item container xs={12} className="header-base" justify="center">
                <Grid item xs={12} md={4} >
              
                
                    <h1>Association<br />de Parents d'Elèves</h1>
                   
                    <p className="header-paragraphe">de l'école Publique des Villards/Thônes</p>
                </Grid>
                
                <Grid item md={4} >
                    <img src={require('../../assets/img/LogoAPE400.png')} alt="logoAPE" className="header-logo"/>
                   
                </Grid>
               

            </Grid>
            <Grid item xs={12}>
                <img src={require('../../assets/img/wave1.svg')} alt="separation" className="header-separation" />

            </Grid>


        </Grid>
    );
}

export default Header;



