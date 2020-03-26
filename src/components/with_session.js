import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_CURRENT_USER, GET_CATEGORIES } from "../graphql/queries";

function foo() {
  return console.log('foo')
}

export default Component => props => {
  const { loading, data, error, client } = useQuery(GET_CURRENT_USER);
  const categoriesData = useQuery(GET_CATEGORIES);
  if (error) console.log(error)
  if (error) return <p>Error...</p>
  if (categoriesData.loading || loading) return (
    <p style={{
      textAlign: 'center',
      padding: '20px'
    }}>
      Loading...
    </p>
  )

  const { getCurrentUser } = data;
  const { getCategoriesWithSubCategories } = categoriesData.data

  const { resetStore } = client;
  return (
    <Component
      categories={getCategoriesWithSubCategories || []}
      getCurrentUser={getCurrentUser}
      resetStore={resetStore}
      {...props}
      {...data}
    />
  );
};
