import React from "react";
import { NavHashLink as NavLink } from 'react-router-hash-link';

import { FaFacebook } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
// import local 
import "./footer.scss"


// import material ui
import Grid from '@material-ui/core/Grid';


const Footer = () => {

    return (
        <Grid
            container
            direction="row"
            className="footer-allContent"
        >
            <Grid item xs={12}>
                <img src={require('../../assets/img/wave4.svg')} alt="separation" className="footer-separation" />
            </Grid>
            <Grid item container xs={12} justify="center" alignItems="center" className="footer-base">
                <Grid item md={3}>
                    <img src={require('../../assets/img/LogoAPE400.png')} alt="logoAPE" className="footer-logo" />
                </Grid>

                <Grid item xs={12} md={3}>
                    <p >Association de Parents d'élèves <br /> de l'école publique des Villards sur Thônes<br /> Association loi 1901</p>
                </Grid>
                <Grid item xs={12} md={3}>
                    <ul>
                        <li><NavLink smooth to="/#home">Accueil</NavLink></li>
                        <li><NavLink smooth to="/#posts">Actualités</NavLink></li>
                        <li><NavLink smooth to="/#evenements">Evénements</NavLink></li>
                        <li><NavLink smooth to="/mentionslegales">Mentions légales</NavLink></li>
                    </ul>
                </Grid>
                <Grid item xs={12} md={12}>
                    <a href="https://www.facebook.com/apelesvillardssurthones"><FaFacebook size="3em" color="white" /></a>
                    <a href="mailto:apevillardssurthones@gmail.com"><GrMail size="3em" color="white" /></a>
                </Grid>
                <Grid item xs={12} md={12} align="center">
                    <div className="copyright">Tous droits réservés à l'association <br />Réalisation web  <a href="https://fabrice-web.fr">fabrice-web.fr</a></div>
                </Grid>


            </Grid>


        </Grid>

    );
}

export default Footer;