import React, { useState } from "react"
import { useQuery } from '@apollo/react-hooks';
import Layout from '../layout'
import SEO from '../seo'
import { GET_SUBCATEGORY_ALL_PRODUCTS } from '../../graphql/queries'
import { ItemWithInfoNoGallery } from './productItem'
import css from './index.module.scss'
// import idGen from '../../helpers/id_generator'



function Body({ subCategory }) {

    const { data, loading } = useQuery(GET_SUBCATEGORY_ALL_PRODUCTS, {
        variables: { subCategory },
        onError: err => console.log(err),
        onCompleted: data => console.log(data)
    })
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
        <div className='container'>
            <h1 className={css.heading}>{subCategory}</h1>
            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
            {!loading && data.getSubCategoryAllProducts.length &&
                <ul className={css.allCategoryProducts}>
                    {data.getSubCategoryAllProducts.map(props => (
                        <ItemWithInfoNoGallery key={props._id} {...props} />
                    ))}
                </ul>
            }
        </div>
    )

}

function CategoryAllProducts({ location, category, subcategory }) {
    const siteMapNav = [
        {
            "name": "Home",
            "url": "/"
        },
        {
            "name": "Products",
            "url": "/products"
        },
        {
            "name": category.charAt(0).toUpperCase() + category.substring(1),
            "url": `/products/${category}`
        },
        {
            "name": subcategory.charAt(0).toUpperCase() + subcategory.substring(1),
            "url": `/products/${category}/${subcategory}`
        },
    ]
    return (
        <Layout siteMapNav={siteMapNav} location={location} language='en'>
            <SEO title="Category Products" />
            <Body subCategory={subcategory} />
        </Layout >
    )
}

export default CategoryAllProducts;