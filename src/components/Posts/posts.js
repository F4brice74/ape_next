import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../../components/LoginButton/LoginButton';


// import material ui
import {
    Button,
} from '@material-ui/core'


// import animation


//import locaux
import "./posts.scss"



const Posts = ({ posts }) => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    // console.log("user from posts", user, "userlocal from post", userLocal)

    return (
        <div>

            <h1>POSTS</h1>
            {posts.sort((a, b) => b.createdAt - a.createdAt).map(post => (
                <div key={post.id}>
                    <Link to={`/posts/${post.slug}`} >
                        <p>{post.title}</p>
                    </Link>
                </div>
            ))
            }

        </div>

        //  {/* <div>
        //     {isAuthenticated ? (
        //         <div>
        //             <h1>POSTS</h1>
        //             {posts.sort((a, b) => b.createdAt - a.createdAt).map(post => (
        //                 <div key={post.id}>
        //                     <Link to={`/posts/${post.slug}`} >
        //                         <p>{post.title}</p>
        //                     </Link>
        //                 </div>
        //             ))
        //             }
        //         </div>
        //     ) :
        //         <>
        //             <p>Accès refusé, vous devez vous identifier</p>
        //             <Button onClick={() => loginWithRedirect()}>se connecter</Button>

        //         </>
        //     }

        // </div> */}
    )
};

export default Posts;

Posts.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string
}