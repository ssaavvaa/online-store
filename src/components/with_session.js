import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_CURRENT_USER } from "../graphql/queries";

export default Component => props => {
  const { loading, data, error, client } = useQuery(GET_CURRENT_USER);
  if (error) console.log(error)
  if (error) return <p>Error...</p>
  if (loading) return <p>Loading...</p>

  const { getCurrentUser } = data;
  console.log(data)
  const { reFetchObservableQueries, resetStore } = client;
  return (
    <Component
      getCurrentUser={getCurrentUser}
      resetStore={resetStore}
      reFetchObservableQueries={reFetchObservableQueries}
      {...props}
      {...data}
    />
  );
};
