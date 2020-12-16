import React from "react";
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { gql, useQuery, NetworkStatus } from '@apollo/client'
import { useSession } from "next-auth/client";
import ErrorPage from "../../utils/errorpage"
// import material ui
import {
    Grid,
    CardContent,
    Card,
    CardHeader,
    Button,
    CardActions,
    Divider,
    makeStyles
} from '@material-ui/core'

export const COMMISSION_QUERY = gql`
query commission {
    commissions {
              id
              name
              content
              users_permissions_users {
                  id
                  lastname
                  firstname
                  email
                  role {
                      name
                  }
              }
          }
   }   
`;



// import local

const useStyles = makeStyles(theme => ({
    root: {
        margin: "50px",
        borderRadius: 12,
        minWidth: 250,
        boxShadow: "0px 10px 10px 0px rgba(0,0,0,0.4)",
        '& .MuiCardContent-root': {
            padding: "2px",
          },
    },
    header: {
        textAlign: 'center',
        spacing: 10,
        backgroundColor: '#224596',
        color: 'white',
        textTransform:"uppercase",
    },
    list: {
        padding: '20px',
        '& p': {
            fontSize: "0.9em",
        }
       
    },
    button: {
        margin: theme.spacing(1),
    },
    action: {
        display: 'flex',
        justifyContent: 'space-around',
    },
}));

const Commission = ({strapiUserRole}) => {
    const [session] = useSession();
    const classes = useStyles();
    const { loading, error, data } = useQuery(COMMISSION_QUERY);
    if (error) return <ErrorPage ErrorMessage={error.message} />;
    if (loading) return <span className="loader"></span>;
    
    
    const commissions = data.commissions
    //console.log (commissions)
    
    if (session && strapiUserRole === "Parent") {  
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            className="container"
        >
            <Grid item container alignItems="flex-start" xs={10} md={8}>
                <Grid item align="center" xs={12}>
                   <p align="left">L’APE fonctionne avec un bureau élu et un bureau élargi composé de membres actifs.
Pour encore mieux préparer, et réaliser nos événements et plus généralement pour participer à la vie
de l’association, l’APE souhaite mettre en place 3 commissions :<br />
<strong>COMMUNICATION, ANIMATIONS, LOGISTIQUE</strong><br />
Ces 3 commissions ont pour but de permettre à tous ceux qui le souhaitent de prendre part
concrètement à la vie de l’association, à la hauteur de ses disponibilités, de ses compétences, de ses
envies, tout au long de l’année, et pas uniquement lors des événements.<br />
Nous avons établi une liste de tâches et un rétro-planning pour chaque commission et pour
chaque événement. 
Nous souhaitons que tous les parents qui le souhaitent nous rejoignent au sein de ces commissions.</p>
                </Grid>
                {commissions.map(commission => (
                    <Grid item xs={10} sm={6} md={6} lg={4} key={commission.id}>
                    <Card className={classes.root}>
                        <CardHeader title={commission.name} className={classes.header} />
                        <Divider variant="middle" />
                        <CardContent>
                            <div className={classes.list}>
                            {ReactHtmlParser(commission.content)}
                            </div>
                        </CardContent>
                        <Divider variant="middle" />
                        <CardActions className={classes.action}>
                            {/* <Button variant="contained" color="primary" className={classes.button}>
                                Buy </Button> */}
                        </CardActions>
                    </Card>
                    </Grid>
                ))}
                


            </Grid>
        </Grid>
    );
}
return (
    <div>
        <h5>Bienvenue sur l'espace Parent</h5>
        <p>vous êtes bien connectés mais votre profil de "parent" n'a pas encore été vérifié par notre administrateur.</p>
        <p>Merci de revenir plus tard</p>
    </div>

)
}

export default Commission;

