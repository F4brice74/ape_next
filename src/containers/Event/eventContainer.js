import React from "react";
import Event from "../../components/Event/event";
import Query from "../../components/Query/query";
import EVENT_QUERY from "../../queries/event/event-query";
import { useParams } from "react-router";

const EventContainer = () => {
  let { slug } = useParams();
  return (
    <div>   
      <Query query={EVENT_QUERY} id={slug}>
        {({ data: { events } }) => {
          return <Event event={events} />;
        }}
      </Query>
    </div>
  );
};

export default EventContainer;