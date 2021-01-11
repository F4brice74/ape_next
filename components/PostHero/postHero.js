
import PropTypes from 'prop-types';
import { gql, useQuery, NetworkStatus } from '@apollo/client'

import ReactHtmlParser from 'react-html-parser';
//import Moment from 'react-moment';
import ScrollAnimation from 'react-animate-on-scroll';


// import material ui
import {
    Grid,
} from '@material-ui/core'

// import local
import styles from "./postHero.module.scss"


export const POSTHERO_QUERY = gql`
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



const PostHero = () => {
    
    const { loading, error, data } = useQuery(POSTHERO_QUERY);
    if (error)
    if (error) return `Error! ${error.message}`
    if (loading)
      return <><p>les données arrivent ! :-)</p><span className="loader"></span></>;

  const { posts: postHero} = data;

   const post = postHero[0]

    // console.log("postHero", post)

    return (
        <Grid
            container
            direction="row"
            justify="center"
            className="container"
        >
            <Grid item xs={12}>
                <img src='images/wave2.svg' alt="separation" className={styles.postHero_separation} />
            </Grid>
            <Grid
                item container
                xs={12}
                justify="center"
                alignItems="center"
                className={styles.postHero_base}
            >
                <Grid item container alignItems="center" justify="center" xs={10} md={7}>
                    <Grid item xs={12} align="center">
                        <ScrollAnimation animateIn="bounceIn" duration={0.5}>
                            <h2>Dernière actu</h2>
                        </ScrollAnimation>
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <img className={styles.post_image} src={post.image.url} alt="reference" />
                    </Grid>
                    <Grid item container alignItems="center" xs={10} md={8}>
                        <Grid item align="left" xs={12} className={styles.post_grid}>
                            <p className={styles.post_title}>{post.title}</p>
                            {/* <p className={styles.post_date}><Moment format="DD/MM/YYYY">{post.createdAt}</Moment></p> */}
                        </Grid>

                        <Grid item xs={12}>
                        <ScrollAnimation animateIn="fadeInUp" duration={0.5} >
                            <div className={styles.post_content}>  {ReactHtmlParser(post.content)}</div>
                            </ScrollAnimation>
                        </Grid>


                    </Grid>

                </Grid>

            </Grid>
            <Grid item xs={12}>
                <img src='images/wave2.svg' alt="separation" className={styles.postHero_separation2} />
            </Grid>

        </Grid>



    );
}

export default PostHero;


PostHero.propTypes = {
    title: PropTypes.string
}