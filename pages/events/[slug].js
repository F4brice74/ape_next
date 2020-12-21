import React from "react";
import PropTypes from 'prop-types';
import EventComponent from "../../components/Event/eventComponent"
import WithGraphQL from "../../lib/with-graphql";



const Event = ({ slug }) => {
    //console.log(slug)
    return (
        <WithGraphQL>
            <EventComponent slug={slug} />
        </WithGraphQL>
    )
};

export async function getServerSideProps(context) {
   const {slug} = context.query
  // console.log(slug)
   
    return {
      props: {
          slug:slug
      },
    };
  };

export default Event;

Event.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string
}