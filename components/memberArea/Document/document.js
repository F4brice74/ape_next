import React from "react";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PropTypes from 'prop-types';
import { gql, useQuery, NetworkStatus } from '@apollo/client'
import { useSession } from "next-auth/client";
import ErrorPage from "../../utils/errorpage"
// import material ui
import {
    Grid,
} from '@material-ui/core'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const DOCUMENT_QUERY = gql`
query documents {
    documents {
     id
     title
              file {
                  name
                  url
              }       
     }
   }
`

// import local
import styles from "./document.module.scss"


const Document = ({ strapiUserRole }) => {
    const [session] = useSession();
    const { loading, error, data } = useQuery(DOCUMENT_QUERY);
    if (error) return <ErrorPage ErrorMessage={error.message} />;
    if (loading) return <span className="loader"></span>;
    const documents = data.documents
    console.log(documents)

    if (session && strapiUserRole === "Parent") {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                className="container"
            >
                <Grid item container alignItems="center" xs={10} md={8} align="left">
                    <p>L'ensemble des documents officiels de notre association : convocation Assemblée Générale, rapport d'AG, bulletin d'adhésion, formulaire de vente ... seront disponibles en téléchargement pour faciliter nos échanges.</p>
                    <Grid item align="left" xs={12}>

                        {documents.map(document => (
                           <div className={styles.document_table}>
                                <TableRow key={document.title} >
                                    <TableCell align="left"><a target="blank" href={document.file.url}><PictureAsPdfIcon fontSize="large" color="primary" className="icon" /></a></TableCell>
                                    <TableCell align="left">{document.title}</TableCell>
                                </TableRow>
                                </div>
                            ))}
                    </Grid>

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

export default Document;

