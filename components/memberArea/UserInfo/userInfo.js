import React, { useEffect, useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import { gql, useQuery, NetworkStatus } from '@apollo/client'
// loval 
import styles from "./userinfo.module.scss"
import ErrorPage from "../../utils/errorpage"
// form
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// import material ui
import { Grid, Button, Accordion, AccordionSummary, AccordionDetails, } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const COMMISSION_QUERY = gql`
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
              }
          }
   }   
`;

const UPDATE_USER = gql`
mutation UPDATE_USER($id: ID!, $firstname: String!, $lastname: String!, $phoneNumber:String! $commissions: [ID!]! ) {
  updateUser(
    input: {
      where: {id: $id}
      data: { firstname: $firstname, lastname: $lastname, phoneNumber: $phoneNumber, commissions: $commissions }
    }
  ) {
    user {
      id
      firstname
      lastname
      phoneNumber
      commissions {
				name
			}
    }
  }
}
`;
const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const SignupSchema = Yup.object().shape({
  firstname: Yup
    .string()
    .min(2, 'Votre nom ne peut pas comporter qu\'une seule lettre')
    .max(60, 'Votre nom semble trop long')
    .required('Ce champ est requis'),
  lastname: Yup
    .string()
    .min(2, 'Votre prénom ne peut pas comporter qu\'une seule lettre')
    .max(50, 'Votre prénom semble trop long')
    .required('Ce champ est requis'),
  phoneNumber: Yup
    .string('entrez votre numéro de téléphone')
    .matches(phoneRegex, 'numero de téléphone non valide')
});


const UserInfo = ({ strapiUserRole, strapiUser, userId }) => {
  const [isLoading, setIsLoading] = useState(false)
  // console.log(strapiUser, commissions)
  const id = userId;
  const [updateUser] = useMutation(UPDATE_USER,);
  //console.log(strapiUser);

  if (isLoading)
    return <span className="loader"></span>;
  const [session] = useSession();
  const { loading, error, data } = useQuery(COMMISSION_QUERY);
  if (error) return <ErrorPage ErrorMessage={error.message} />;
  if (loading) return <span className="loader"></span>;


  const commissions = data.commissions;
  if (session && strapiUserRole === "Parent") {
    return (
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
        className="container"

      >
        <Grid item container xs={10} md={8}>
        <p>Vos informations sont précieuses, n'hésitez pas à les compléter.</p>
          <Grid item xs={10} md={12}>
          <div className={styles.userInfo_infos}>
            
            
            <TableRow>
              <TableCell align="right">
                <p className={styles.user_head}>Votre prénom : </p>
              </TableCell>
              <TableCell align="left">
                <p>{strapiUser.firstname ? strapiUser.firstname : <span className={styles.user_answer}
                ><i>non renseigné</i></span>}</p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <p className={styles.user_head}>Votre nom : </p>
              </TableCell>
              <TableCell align="left">
                <p>{strapiUser.lastname ? strapiUser.lastname : <span className={styles.user_answer}><i>non renseigné</i></span>}</p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <p className={styles.user_head}>Votre email : </p>
              </TableCell>
              <TableCell align="left">
                <p>{strapiUser.email}</p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <p className={styles.user_head}>Votre numéro de téléphone : </p>
              </TableCell>
              <TableCell align="left">
                <p>{strapiUser.phoneNumber ? strapiUser.phoneNumber : <span className={styles.user_answer}><i>non renseigné</i></span>}</p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <p className={styles.user_head}>Commission(s) : </p>
              </TableCell>
              <TableCell align="left">
                <p>{strapiUser.commissions.map(commission => (
                <>{commission.name ? commission.name + ", " : <span className={styles.user_answer}><i>non renseigné</i></span>}</>
              ))}</p>
              </TableCell>
            </TableRow>

          </div>
          </Grid>



          <Grid item xs={10} md={6}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="content"
                id="header"
              >
                <p> Mettre à jour mes informations </p>
              </AccordionSummary>
              <AccordionDetails>

                <Formik
                  initialValues={{
                    firstname: '',
                    lastname: '',
                    phoneNumber: '',
                    commissions: [],
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={(values, { resetForm }) => {
                    //console.log(values)
                    //alert(JSON.stringify(values, null, 2));
                    updateUser({ variables: { id: id, firstname: values.firstname, lastname: values.lastname, phoneNumber: values.phoneNumber, commissions: values.commissions } });
                    resetForm({ values: '' });

                  }}
                >

                  <Form>

                    <Field
                      id="firstname"
                      name="firstname"
                      type="text"
                      fullWidth
                      component={TextField}
                      label="votre prénom"
                    />

                    <Field
                      id="lastname"
                      name="lastname"
                      label="Votre nom"
                      fullWidth
                      component={TextField}
                    />

                    <Field
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      label="Votre numéro de téléphone"
                      fullWidth
                      component={TextField}
                    />
                    <div className={styles.checkboxGroup}>
                      <div id="checkbox-group"><p>Commission à laquelle vous souhaitez participer :</p></div>
                      <div role="group" aria-labelledby="checkbox-group" >
                        {commissions.map(commission => (
                          <label>
                            <Field type="checkbox" name="commissions" value={commission.id} />
                            <p className={styles.userInfo_checkbox}>{commission.name}</p>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" variant="contained" color="primary">mettre à jour</Button>
                  </Form>

                </Formik>
              </AccordionDetails>
            </Accordion>

          </Grid>

        </Grid>
      </Grid >
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

export default UserInfo;




