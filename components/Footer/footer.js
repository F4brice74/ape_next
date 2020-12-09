import React from "react";
import Image from 'next/image'
import Link from 'next/link'

//import { FaFacebook } from "react-icons/fa";
//import { GrMail } from "react-icons/gr";
// import local 
import styles from "./footer.module.scss"


// import material ui
import Grid from '@material-ui/core/Grid';


const Footer = () => {

    return (
        <Grid
            container
            direction="row"
            //className={styles.footer_allContent}
        >
            <Grid item xs={12}>
            <img 
            src='/images/wave4.svg'
            alt="separation"
            className={styles.footer_separation}
            />
            </Grid>
            <Grid item container xs={12} justify="center" alignItems="center" className={styles.footer_base}>
                <Grid item md={3}>
                    <img src='/images/LogoAPE400.png' alt="logoAPE" className={styles.footer_logo} />
                </Grid>

                <Grid item xs={12} md={3}>
                    <p >Association de Parents d'élèves <br /> de l'école publique des Villards sur Thônes<br /> Association loi 1901</p>
                </Grid>
                <Grid item xs={12} md={3}>
                    <ul>
                        <li><Link href="/#home">Accueil</Link></li>
                        <li><Link href="/#posts">Actualités</Link></li>
                        <li><Link href="/#evenements">Evénements</Link></li>
                        <li><Link href="/mentionslegales">Mentions légales</Link></li>
                    </ul>
                </Grid>
                {/* <Grid item xs={12} md={12}>
                    <a href="https://www.facebook.com/apelesvillardssurthones"><FaFacebook size="3em" color="white" /></a>
                    <a href="mailto:apevillardssurthones@gmail.com"><GrMail size="3em" color="white" /></a>
                </Grid> */}
                <Grid item xs={12} md={12} align="center">
                    <div className={styles.copyright}>Tous droits réservés à l'association <br />Réalisation web  <a href="https://fabrice-web.fr">fabrice-web.fr</a></div>
                </Grid>


            </Grid>


        </Grid>

    );
}

export default Footer;