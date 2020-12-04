import React from "react";
import { useQuery } from "@apollo/react-hooks";
import ErrorPageGlobale from  "../includes/errorpageglobale"

//import material ui
import CircularProgress from '@material-ui/core/CircularProgress';

const Query = ({ children, query, id }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { slug: id, id:id }
  });

  if (loading) return <div className="circularProgress"><CircularProgress size={100}/></div>;
  if (error) return <ErrorPageGlobale />;
  return children({ data });
};

export default Query;