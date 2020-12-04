import React from "react";
import PropTypes from 'prop-types';


// import local
import "./post.scss"

const Post = ({ thepost }) => {

    return (
        <div>
            <p>{thepost.title}</p>
        </div>
    );
}

export default Post;

Post.propTypes = {
    title: PropTypes.string
}