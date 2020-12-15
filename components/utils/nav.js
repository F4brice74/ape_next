import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/client";


// Import Material ui
import {
  Grid,
  Drawer,
  Button,
  MenuItem,
  AppBar,
  Toolbar,
} from '@material-ui/core'

// import local
import styles from './nav.module.scss';
import { SingleFieldSubscriptionsRule } from 'graphql';

const useStyles = makeStyles({
  button: {
    position: "absolute",
    right: 0,
    color: '#333333',
    backgroundColor: "white",
    textTransform: 'lowercase',
    fontFamily: "Nunito",
    fontSize: "0,6em",
    fontWeight: 'bolder',
    '&:hover': {
      color: '#60A3FA',
      backgroundColor: "white",
      transform: 'rotate(-5deg)',
      fontSize: '0,8em'
    },
  },
  buttonMobile: {
    textDecoration: 'none',
    fontSize: '1em',
    fontFamily: "'Nunito', sans-serif",
    color: "#333333",
    lineHeight: "2.2",
    position: "relative",
    cursor: "pointer",
    textTransform: 'lowercase',
    paddingLeft:'0',
  },

});

const Nav = () => {

  const [session] = useSession();
  const classes = useStyles();
  const [drawerOpen, setdrawerOpen] = useState(false);

  const toggleDrawerButton = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setdrawerOpen(!drawerOpen)
  };

  return (
    <Grid item xs={12} container>
      <Toolbar
        className={styles.desktopAppbar} position="fixed">
        <img src='images/logoAPE.png' alt="logo" className={styles.navLogo} />

        <Link href="/">
          <a className={styles.btn}>Accueil</a>
        </Link>
        <Link href="/#evenements">
          <a className={styles.btn}>Evénements</a>
        </Link>
        {session && (
          <>
            <Link href="/apeMembres">
              <a className={styles.btn}>Espace Parents</a>
            </Link>
            <Button className={classes.button} onClick={signOut}>déconnexion</Button>
          </>
        )}
        {!session && (
          <Button className={classes.button} onClick={signIn}>Se connecter</Button>
        )}
      </Toolbar>


      <AppBar
        className={styles.mobileAppbar}
        position="fixed"
        color="inherit"
      >
        <div >
          <Button className={classes.button} onClick={toggleDrawerButton} >
            Menu
        </Button>
          <Drawer className={styles.mobileAppbar} open={drawerOpen} onClose={toggleDrawerButton}>
            <MenuItem onClick={toggleDrawerButton}><Link className={styles.list} href="/">Accueil</Link></MenuItem>
            <MenuItem onClick={toggleDrawerButton}><Link className={styles.list} href="/#evenements">Evénements</Link></MenuItem>
            {session && (
              <>
                <MenuItem onClick={toggleDrawerButton}><Link className={styles.list} href="/apeMembres">Membres</Link></MenuItem>
                <MenuItem onClick={toggleDrawerButton}><Button className={classes.buttonMobile} onClick={signOut}>déconnexion</Button></MenuItem>
              </>
            )}
            {!session && (
              <MenuItem onClick={toggleDrawerButton}> <Button className={styles.list} onClick={signIn}>Se connecter</Button></MenuItem>
            )}
          </Drawer>
        </div>
      </AppBar>
    </Grid>
  );
};
export default Nav;
