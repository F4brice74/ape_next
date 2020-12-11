import React, { useEffect, useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

// loval 
import "./userinfo.scss"

// form
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// import material ui
import { Grid, Button, Accordion, AccordionSummary, AccordionDetails, } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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


const UserInfo = ({ strapiUsers, commissions }) => {
  const strapiUser = strapiUsers[0]
 // console.log(strapiUser, commissions)
  const id = strapiUser.id
  const [updateUser] = useMutation(UPDATE_USER,);

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
      className="container"

    >
      <Grid item container xs={10} md={8}>
        <Grid item xs={10} md={12} className="userInfo_infos">
          <p>Vos informations sont précieuses, n'hésitez pas à les compléter.</p>
          <ul>
            <li className="userInfos_li"><p><span className="user_head">Votre prénom : </span> {strapiUser.firstname ? strapiUser.firstname : <span className="user_answer
            "><i>non renseigné</i></span>}</p></li>

            <li><p><span className="user_head">Votre nom : </span>{strapiUser.lastname ? strapiUser.lastname : <span  className="user_answer"><i>non renseigné</i></span>}</p></li>
            
            <li><p><span className="user_head">Votre email : </span>{strapiUser.email}</p></li>
            
            <li><p><span className="user_head">Votre numéro de téléphone : </span>{strapiUser.phoneNumber ? strapiUser.phoneNumber : <span  className="user_answer"><i>non renseigné</i></span>}</p></li>
            
            <li><p><span className="user_head">Commission(s) : </span>{strapiUser.commissions.map(commission => (
              <>{commission.name ? commission.name + ", " : <span className="user_answer"><i>non renseigné</i></span>}</>
            ))}</p></li>
          </ul>
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
                  updateUser({ variables: { id: id, firstname: values.firstname, lastname: values.lastname, phoneNumber: values.phoneNumber, commissions: values.commissions } })
                  resetForm({ values: '' })
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

                  <div id="checkbox-group"><p>Commission à laquelle vous souhaitez participer :</p></div>
                  <div role="group" aria-labelledby="checkbox-group">
                    {commissions.map(commission => (
                      <label>
                        <Field type="checkbox" name="commissions" value={commission.id} />
                        <p className="userInfo_checkbox">{commission.name}</p>
                      </label>
                    ))}
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

export default UserInfo;




