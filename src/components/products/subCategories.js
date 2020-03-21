import React, { useState } from "react"
import Layout from '../layout'
import { useQuery } from '@apollo/react-hooks';
import css from './subCategories.module.scss'
import { GET_SUBCATEGORIES_PREVIEW } from '../../graphql/queries'
import idGen from '../../helpers/id_generator'
import PreviewSection from './subCategoryPreviewSection'
import SEO from '../seo'





function Body({ category }) {

    const { data, loading } = useQuery(GET_SUBCATEGORIES_PREVIEW, {
        variables: { category },
        onError: err => console.log(err),
        onCompleted: data => console.log(data)
    });

    return (
        <div className='container'>
            <h1 className={css.heading}>{category}</h1>
            {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
            {!loading && !data.getSubCategoriesWIthProductsPreview.length &&
                <p style={{ textAlign: "center" }}>This category doesn't exist</p>
            }
            {!loading &&
                data.getSubCategoriesWIthProductsPreview.map(({ subCategory, products }) => (
                    <PreviewSection
                        key={idGen()}
                        category={category}
                        subCategory={subCategory}
                        products={products}
                    />
                ))
            }

        </div>
    )
}


function Category({ category, location }) {

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
    ]

    return (
        <Layout siteMapNav={siteMapNav} location={location} language='en'>
            <SEO title="categories" />
            <Body category={category} />
        </Layout >
    )
}

export default Category