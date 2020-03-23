import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_CURRENT_USER, GET_CATEGORIES } from "../graphql/queries";

export default Component => props => {
  const { loading, data, error, client } = useQuery(GET_CURRENT_USER);
  const categoriesData = useQuery(GET_CATEGORIES);
  if (error) console.log(error)
  if (error) return <p>Error...</p>
  if (categoriesData.loading || loading) return <p
    style={{ textAlign: 'center', marginTop: '50px', fontSize: '40px', fontWeight: 'bold' }}>
    Loading...
    </p>


  const { getCurrentUser } = data;
  const { getCategoriesWithSubCategories } = categoriesData.data

  const { reFetchObservableQueries, resetStore } = client;
  return (
    <Component
      categories={getCategoriesWithSubCategories || []}
      getCurrentUser={getCurrentUser}
      resetStore={resetStore}
      reFetchObservableQueries={reFetchObservableQueries}
      {...props}
      {...data}
    />
  );
};
