// import UserInfo from "../../frontend/src/components/parents/UserInfo/userInfo"
// import Commission from "../../frontend/src/components/parents/Commission/commission"
// import Document from "../../frontend/src/components/parents/Document/document"
import PropTypes from 'prop-types';
import { gql, useQuery, NetworkStatus } from '@apollo/client'
import { useAuth } from 'use-auth0-hooks';
import { useState, useEffect} from 'react'

// import material ui
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

// import local 
import styles from "./profile.module.scss"


const USERME_QUERY = gql`
query user($id: String!) {
    users (where: {id: $id}) {
    id
	firstname
	lastname
	username
    email
    phoneNumber
     role {
      name
      }
    commissions {
        name
    }
    }
    commissions {
              id
              name
              content
              users_permissions_users {
                  id
                  lastname
                  firstname
                  email
              }
          }
    documents {
        id
        title
                 file {
                     name
                     url
                 }       
        }    
    }
    
`;

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

const Profile = () => {


const { isAuthenticated, user } = useAuth();
console.log ("user from profile :", user)

const userId = user.sub.replace('auth0|', '')
console.log ("id from profile :", userId)
// const { loading, error, data } = useQuery(USERME_QUERY, {
//   variables: { id: '5f80273512b50c718213968b' },
// });
//     if (error)
//       return <div>Erreur dans le chargement du profil{error}</div>;
//     if (loading)
//       return <div>Loading</div>;

// //const { users: strapiUsers, commissions, documents} = data;
// console.log("data from profile : ", data)
const classes = useStyles();
const [value, setValue] = useState(0);
//console.log("user from profile", strapiUsers)
//const strapiUserRole = strapiUsers[0].role.name ? strapiUsers[0].role.name : "Public"
const strapiUserRole = "Parent"
const handleChange = (event, newValue) => {
    setValue(newValue);
  };


if (isAuthenticated && strapiUserRole === "Parent") {
  return (
    <Grid 
     container
     direction="column"
     justify="space-evenly"
     alignItems="center"
     align="left">

          <h2>Bienvenue sur l'espace membres</h2> 
          <AppBar position="static" className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="full width tabs example"
           
            variant="scrollable"
            scrollButtons="auto"
          >            
            <Tab label='Messages du bureau' />
            <Tab label='Commissions' />
            <Tab label='Documents' />
            <Tab label='Mes informations' />
          </Tabs>
          </AppBar>
          <TabPanel value={value} index={3} className={styles.tabPanel}>            
              {/* <UserInfo strapiUsers ={strapiUsers} commissions={commissions} /> */}
          </TabPanel>
          <TabPanel value={value} index={0} className={styles.tabPanel}>
            {/* <PrivatePostsContainer className={styles.privateContainer} /> */}
          </TabPanel>
          <TabPanel value={value} index={1} className={styles.tabPanel}>
            {/* <Commission commissions={commissions} /> */}
          </TabPanel>
          <TabPanel value={value} index={2} className={styles.tabPanel}>
           {/* <Document documents={documents} /> */}
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

// export async function getServerSideProps({ req, res }) {
//   // Here you can check authentication status directly before rendering the page,
//   // however the page would be a serverless function, which is more expensive and
//   // slower than a static page with client side authentication
//   const session = await auth0.getSession(req)
//   if (!session || !session.user) {
//     res.writeHead(302, {
//       Location: '/api/login',
//     })
//     res.end()
//     return
//   }
//   const token = req.headers.cookie ? req.headers.cookie : null;

 

//   return { props: { user: session.user, session:session } }
// }

Profile.propTypes = {
  //phoneNumber: PropTypes.number,
  child1: PropTypes.string,
  child2: PropTypes.string,
  child3: PropTypes.string,
}