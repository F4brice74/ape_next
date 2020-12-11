import React, { useState } from 'react';
import  {makeStyles} from "@material-ui/core/styles";
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
        <Link className={styles.btn, styles.from_center} href="/">Accueil</Link>
        <Link className={styles.btn, styles.from_center} href="/#evenements">Evénements</Link> 
        
        
        
        {session && (
          <>
        <Link className={styles.btn, styles.from_center} href="/apeMembres">Espace Parents</Link>
        <Button className={classes.root} onClick={signOut} >Se déconnecter</Button>
        </>
        )}
        {!session && (
        <Button className={classes.root} onClick={signIn} >Accès parents</Button>
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
            {SingleFieldSubscriptionsRule && (
              <>
                <MenuItem onClick={toggleDrawerButton}><Link className={styles.list} href="/apeMembres">Espace Parents</Link></MenuItem>
                <MenuItem onClick={toggleDrawerButton}><Link className={styles.list} href="/api/logout">Se déconnecter</Link></MenuItem>
                
              </>
            )}
            {!session && (
              <MenuItem onClick={toggleDrawerButton}><Link className={styles.list} href="/api/login">Se connecter</Link></MenuItem>
            )} 
          </Drawer>
        </div>
      </AppBar>

    </Grid>



  );
};
export default Nav;
