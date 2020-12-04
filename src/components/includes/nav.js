import React, { useState } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import  {makeStyles} from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";


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
import './nav.scss';
import { useContext } from 'react';



const useStyles = makeStyles({
  root: {
    position: "absolute",
    right: 0,
    textTransform: "lowercase",
    fontFamily: "Nunito",
    fontWeight: "bolder"
  }
});


const Nav = () => {
  const { 
    isAuthenticated,
    loginWithRedirect,
    logout,
    user, 
  } = useAuth0()

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
        className="desktopAppbar" position="fixed">
        <img src={require('../../assets/img/logoAPE.png')} alt="logo" className="navLogo" />
        <NavLink className="btn from-center" smooth to="/#home">Accueil</NavLink>
        <NavLink className="btn from-center" smooth to="/#evenements">Evénements</NavLink> 
        {isAuthenticated && (
          <>
        <NavLink className="btn from-center" smooth to="/profile">Espace Parents</NavLink>
        <Button className={classes.root} onClick={logout}>Se déconnecter</Button>
        </>
        )}
        {!isAuthenticated && (
        <Button className={classes.root} onClick={loginWithRedirect}>Accès parents</Button> 
        )}         
      </Toolbar>
      

      <AppBar
        className="mobileAppbar"
        position="fixed"
        color="inherit"
      >
        <div >
          <Button onClick={toggleDrawerButton} >
            Menu
        </Button>
          <Drawer className="mobileAppbar" open={drawerOpen} onClose={toggleDrawerButton}>
            <MenuItem onClick={toggleDrawerButton}><NavLink className="list" to="/">Accueil</NavLink></MenuItem>
            <MenuItem onClick={toggleDrawerButton}><NavLink className="list" to="/#evenements">Evénements</NavLink></MenuItem>
            {isAuthenticated && (
              <>
                <MenuItem onClick={toggleDrawerButton}><NavLink className="list" to="/profile">Espace Parents</NavLink></MenuItem>
                <MenuItem onClick={toggleDrawerButton}><p className="list" onClick={logout}>Se déconnecter</p></MenuItem>
              </>
            )}
            {!isAuthenticated && (
              <MenuItem onClick={toggleDrawerButton}><p className="list" onClick={loginWithRedirect}>Se connecter</p></MenuItem>
            )} 
          </Drawer>
        </div>
      </AppBar>

    </Grid>



  );
};
export default Nav;
