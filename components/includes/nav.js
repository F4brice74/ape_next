import React, { useState } from 'react';
import  {makeStyles} from "@material-ui/core/styles";
import Link from 'next/link'
import { useAuth } from 'use-auth0-hooks';

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




const useStyles = makeStyles({
  root: {
    position: "absolute",
    right: 0,
    textTransform: "lowercase",
    fontFamily: "Nunito",
    fontWeight: "bolder",
    fontSize: "16px" 
  }
});


const Nav = () => {
  const { 
    isAuthenticated,
    login,
    isLoading,
    logout,
    user, 
  } = useAuth()


  const classes = useStyles();
  const [drawerOpen, setdrawerOpen] = useState(false);

  const toggleDrawerButton = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setdrawerOpen(!drawerOpen)
  };

  console.log ("user from nav :", user)
  return (
    <Grid item xs={12} container>
   
      <Toolbar
        className={styles.desktopAppbar} position="fixed">
        <img src='images/logoAPE.png' alt="logo" className={styles.navLogo} />
        <Link className={styles.btn, styles.from_center} href="/">Accueil</Link>
        <Link className={styles.btn, styles.from_center} href="/#evenements">Evénements</Link> 
        
        
        
        {isAuthenticated && (
          <>
        <Link className={styles.btn, styles.from_center} href="/profile">Espace Parents</Link>
        <Button className={classes.root} onclick={logout}>Se déconnecter</Button>
        </>
        )}
        {!isAuthenticated && (
        <Button className={classes.root} onClick={login}>Accès parents</Button>
        )}         
      </Toolbar>
      

      <AppBar
        className={styles.mobileAppbar}
        position="fixed"
        color="inherit"
      >
        <div >
          <Button onClick={toggleDrawerButton} >
            Menu
        </Button>
          <Drawer className={styles.mobileAppbar} open={drawerOpen} onClose={toggleDrawerButton}>
            <MenuItem onClick={toggleDrawerButton}><Link className={styles.list} href="/">Accueil</Link></MenuItem>
            <MenuItem onClick={toggleDrawerButton}><Link className={styles.list} href="/#evenements">Evénements</Link></MenuItem>
            {isAuthenticated && (
              <>
                <MenuItem onClick={toggleDrawerButton}><Link className={styles.list} href="/profile">Espace Parents</Link></MenuItem>
                <MenuItem onClick={toggleDrawerButton}><Link className={styles.list} href="/api/logout">Se déconnecter</Link></MenuItem>
                
              </>
            )}
            {!isAuthenticated && (
              <MenuItem onClick={toggleDrawerButton}><Link className={styles.list} href="/api/login">Se connecter</Link></MenuItem>
            )} 
          </Drawer>
        </div>
      </AppBar>

    </Grid>



  );
};
export default Nav;
