import React, { useState } from "react"
import { useQuery } from '@apollo/react-hooks';
import Layout from '../layout'
import siteMapNav from '../../site-map-nav/products.json'
import SEO from '../seo'
import { GET_CATEGORIES_PREVIEW } from '../../graphql/queries'
import CategoryPreviewSection from './categoryPreviewSection'
import css from './index.module.scss'
import idGen from '../../helpers/id_generator'



function Body() {
    const { data, loading } = useQuery(GET_CATEGORIES_PREVIEW);

    // async function showMoreItems() {
    //     const { data: { getAllProducts } } = await fetchMore({
    //         variables: { limit: limit + 6 },
    //         updateQuery: (_, { fetchMoreResult }, err) => {
    //             setProducts(fetchMoreResult.getAllProducts)
    //             return fetchMoreResult
    //         },


    //     })
    //     if (getAllProducts.length === products.length) {
    //         return setNoMore(true)
    //     }

    //     return setLimit(limit + 8);
    // }
    return (
        <div className='wrapper'>
            <h1 className={css.heading}>PRODUCTS</h1>
            {loading && <p style={{ textAlign: "center" }}> Loading...</p>}
            {!loading &&
                data.getCategoriesWIthProductsPreview.map(({ category, products }) => (
                    <CategoryPreviewSection
                        key={idGen()}
                        category={category}
                        products={products}
                    />
                )
                )}
        </div>
    )

}

function MainPage({ location }) {
    return (
        <Layout siteMapNav={siteMapNav} location={location} language='en'>
            <SEO title="Products" />
            <Body />
        </Layout >
    )
}

export default MainPage;