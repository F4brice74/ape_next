import React from "react";
import Events from "../../components/Events/events";
import Query from "../../components/Query/query";
import EVENTS_QUERY from "../../queries/events/events-query";

const EventsContainer = () => {
  return (
    <div>   
      <Query query={EVENTS_QUERY}>
        {({ data: { events } }) => {
          return <Events events={events} />;
        }}
      </Query>
    </div>
  );
};

export default EventsContainer;