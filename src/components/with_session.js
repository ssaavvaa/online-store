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
  if (categoriesData.loading || loading) return <div style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'white',
    zIndex: 99
  }}>
    <>

      <Component
        categories={[]}
        location={{ state: null }}
        getCurrentUser={null}
        resetStore={foo()}
      />
    </>
  </div>



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
