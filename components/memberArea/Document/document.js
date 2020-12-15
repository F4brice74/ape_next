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
                    <h5>Les documents de l'APE</h5>
                    <Grid item align="left" xs={12}>

                        {documents.map(document => (
                            <div className={styles.document_div}><a target="blank" href={document.file.url}><PictureAsPdfIcon fontSize="large" color="primary" className="icon" /></a><p> {document.title}</p>
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

