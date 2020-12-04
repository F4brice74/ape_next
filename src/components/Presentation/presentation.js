import React from "react";
import ScrollAnimation from 'react-animate-on-scroll';


// import local
import "./presentation.scss"

//import material ui
import Grid from '@material-ui/core/Grid';


const Presentation = () => {

    return (

        <Grid
            container
            direction="row"
            justify="center"
        >
            <Grid
                item container
                xs={12} md={8}
                alignItems="center"
                justify="center"
                className="container"

            >
                <Grid item xs={12}>
                <ScrollAnimation animateIn="bounceIn" duration={0.5} >
                    <h2 >Qui sommes-nous</h2>
                    </ScrollAnimation>
                </Grid>
                <Grid item xs={12} md={6} align="left" className="presentation-content">
                <ScrollAnimation animateIn="fadeInUp" duration={0.5} >
                    <p >L’APE de l’école publique des Villards-sur-Thônes est une association de parents d’élèves composée d’un bureau de 5 membres élus et de parents d'élèves bénévoles.<br />
                    L’objectif de l'association est de trouver les financements nécessaires aux activités et sorties sportives et culturelles de nos enfants.</p><br />
                    <p>En début d’année scolaire, le bureau de l’APE rencontre l’équipe pédagogique qui présente ses projets pour l’année à venir. En fonction des budgets un arbitrage est effectué en essayant de donner la priorité aux activités et sorties profitant aux plus d’élèves possible. </p><br />
                    <p>L’école n’a pas ou peu de fonds propres. La majorité des activités est donc financée par l’APE, en dehors des “modules” obligatoires faisant partie du programme comme par exemple la piscine pour certaines classes.</p>
                </ScrollAnimation>
                </Grid>
                <Grid item xs={8} md={4}>
                    <img src={require('../../assets/img/photoAPE.jpg')} alt="groupeApe" className="pres-img" />
                </Grid>
            </Grid>


            <Grid
                item container
                xs={8}
                alignItems="flex-end"
            >
                <Grid item xs={12}>
                <ScrollAnimation animateIn="bounceIn" duration={0.5} >
                <h2>Nous finançons</h2>
                </ScrollAnimation>
                    
                </Grid>
                <Grid item xs={12} sm={3} md={3}> 
                <ScrollAnimation animateIn="bounceIn">
                    <h4>les transports</h4>                   
                    <img src={require('../../assets/img/transport.png')} alt="groupeApe" className="pres-ico" />
                    </ScrollAnimation>
                </Grid>
                <Grid item xs={12} sm={3} md={3}> 
                <ScrollAnimation animateIn="bounceIn" delay={200}>
                    <h4>les sorties culturelles</h4>                   
                    <img src={require('../../assets/img/musee.png')} alt="groupeApe" className="pres-ico" />
                    </ScrollAnimation>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                <ScrollAnimation animateIn="bounceIn" delay={300}>
                    <h4>les activités sportives</h4>                   
                    <img src={require('../../assets/img/sport.png')} alt="groupeApe" className="pres-ico" />
                    </ScrollAnimation>                   

                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                <ScrollAnimation animateIn="bounceIn" delay={400}>
                    <h4>la classe verte</h4>                   
                    <img src={require('../../assets/img/classeverte.png')} alt="groupeApe" className="pres-ico" />
                    </ScrollAnimation>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Presentation;
