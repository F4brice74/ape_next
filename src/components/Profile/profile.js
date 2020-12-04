import React from "react";
import PrivatePostsContainer from '../../containers/PrivatePosts/privatePostsContainer';
import UserInfo from "../parents/UserInfo/userInfo"
import Commission from "../parents/Commission/commission"
import Document from "../parents/Document/document"
import PropTypes from 'prop-types';
import { useAuth0 } from "@auth0/auth0-react";

// import material ui
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

// import local 
import "./profile.scss"


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={4}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}



const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: '#224596',
    color: 'white',

    '& .MuiTab-textColorPrimary.Mui-selected': {
      color: "#ff9900",
    },
    '& .MuiTab-textColorPrimary': {
      color: "#ffffff",
    },
  },
});

const Profile = ({strapiUsers, commissions, documents}) => {

const classes = useStyles();

const { isAuthenticated, user } = useAuth0();
const [value, setValue] = React.useState(0);
//console.log("user from profile", strapiUsers)
const strapiUserRole = strapiUsers[0].role.name ? strapiUsers[0].role.name : "Public"
const handleChange = (event, newValue) => {
    setValue(newValue);
  };


if (isAuthenticated && strapiUserRole === "Parent") {
  return (
    <Grid container direction="column" justify="space-evenly"
          alignItems="center" align="left">

          <h2>Bienvenue sur l'espace membres</h2>
         
          
          <AppBar position="static" className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="full width tabs example"
            className="profile-tab"
            variant="scrollable"
            scrollButtons="auto"
          >            
            <Tab label='Messages du bureau' />
            <Tab label='Commissions' />
            <Tab label='Documents' />
            <Tab label='Mes informations' />
          </Tabs>
          </AppBar>
          <TabPanel value={value} index={3} className="tabPanel">            
              <UserInfo strapiUsers ={strapiUsers} commissions={commissions} />
          </TabPanel>
          <TabPanel value={value} index={0} className="tabPanel">
            <PrivatePostsContainer className="privateContainer" />
          </TabPanel>
          <TabPanel value={value} index={1} className="tabPanel">
            <Commission commissions={commissions} />
          </TabPanel>
          <TabPanel value={value} index={2} className="tabPanel">
           <Document documents={documents} />
          </TabPanel>
         
         
        </Grid>
  )
}
else 
  return ( 
    <div>
      <h5>Bienvenue sur l'espace Parent</h5>
      <p>vous êtes bien connectés mais votre profil de "parent" n'a pas encore été vérifié par notre administrateur.</p>
      <p>Merci de revenir plus tard</p>
    </div>
      

  )
}
   
export default Profile;

Profile.propTypes = {
  //phoneNumber: PropTypes.number,
  child1: PropTypes.string,
  child2: PropTypes.string,
  child3: PropTypes.string,
}