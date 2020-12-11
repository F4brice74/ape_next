// import UserInfo from "../../frontend/src/components/parents/UserInfo/userInfo"
// import Commission from "../../frontend/src/components/parents/Commission/commission"
// import Document from "../../frontend/src/components/parents/Document/document"

import { gql, useQuery, NetworkStatus } from '@apollo/client'
import { useSession } from "next-auth/client";
import React, { FormEvent, useEffect, useState } from "react";


// import material ui
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

// import local 
import styles from "./profile.module.scss"





const POSTHERO_QUERY = gql`
query postHero {
  posts(sort: "createdAt:DESC", limit:1, where: {isPublished: "true"}) {
   id
   title
   content	
   excerpt
   isPublished
   slug
   createdAt
   image {
    url
  }
   }
 }
`
const USERME_QUERY = gql`
query {
  user(id: "5f80273512b50c718213968b") {
    id
	firstname
	lastname
	username
    email
     role {
      name
      }
		commissions {
			name
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

const ProfileComponent = () => {

  const [session] = useSession();


     const classes = useStyles();
     const [value, setValue] = useState(0);
   //const userId = session.id

  
   const { loading, error, data } = useQuery(USERME_QUERY, {
    variables: { id: '5f80273512b50c718213968b' },
  });
      if (error) return `Error! ${error.message}`
      if (loading) return <div>Loading</div>;
  
 
   console.log("data from profile : ", data)


  // //console.log("user from profile", strapiUsers)
  // const strapiUserRole = strapiUsers[0].role.name ? strapiUsers[0].role.name : "Public"
  const strapiUserRole = 'Parent'; 
  const handleChange = (event, newValue) => {
       setValue(newValue);
     };
  
  
   if (strapiUserRole === "Parent") {
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
  
     
  export default ProfileComponent


