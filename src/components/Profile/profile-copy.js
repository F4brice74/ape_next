import React, { useContext } from "react";
import PrivatePostsContainer from '../../containers/PrivatePosts/privatePostsContainer';
import { UserContext } from '../../context/UserContext';
import PropTypes from 'prop-types';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";



// import material ui
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress'

// import local 
import "./profile.scss"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Profile = () => {

  const { user } = useContext(UserContext);
 
  const [value, setValue] = React.useState(0);

  //const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 

  console.log("user :", user)
  //console.log("userLocal :", userLocal )
  return (
    <div>

      {(() => {
        if (user) {
          if (user.role.name === "Parent") {
            return <Grid container direction="column" justify="space-evenly"
              alignItems="center" align="left">

              <h5>Bienvenue sur l'espace membres</h5>
              <p>Cher {user.username}, cet espace est en construction, l'idée est de regrouper ici les informations utiles et importantes de l'association. Plus d'informations bientôt ! <br /> merci de votre compréhension !</p>

              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                className="profile-tab"
              >
                <Tab label={'Message du bureau'} />
                <Tab label={'Commissions'} />
                <Tab label={'Documents'} />
              </Tabs>
              <TabPanel value={value} index={0} className="tabPanel">
                <PrivatePostsContainer className="privateContainer" />
              </TabPanel>
              <TabPanel value={value} index={1} className="tabPanel">
                <h5>les infos sur les commissions de l'APE</h5>
              </TabPanel>
              <TabPanel value={value} index={2} className="tabPanel">
                <h5>Les documents à télécharger</h5>
              </TabPanel>


            </Grid>
          }

          else {
            return (

              <Grid container direction="column" justify="space-evenly"
                alignItems="center" className="profile" >
                <h5>Bienvenue sur l'espace membres</h5>
                <p>Cet espace est réservé aux membres parents d'élèves. <br />
          Après vérification de votre mail par notre administrateur vous aurez pleinement accès à toutes les informations</p>

              </Grid>
            )




          }
        }
      })()}

    </div >
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <CircularProgress size={100}/>,
});

Profile.propTypes = {
  //phoneNumber: PropTypes.number,
  child1: PropTypes.string,
  child2: PropTypes.string,
  child3: PropTypes.string,
}