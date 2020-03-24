import React, { useState } from "react"
import Layout from '../layout'
import { useQuery } from '@apollo/react-hooks';
import css from './subCategories.module.scss'
import { GET_SUBCATEGORIES_PREVIEW } from '../../graphql/queries'
import idGen from '../../helpers/id_generator'
import PreviewSection from './subCategoryPreviewSection'
import SEO from '../seo'





function Body({ category }) {

    const [products, setProducts] = useState([])

    const { loading } = useQuery(GET_SUBCATEGORIES_PREVIEW, {
        variables: { category },
        onError: err => console.log(err),
        onCompleted: data => setProducts(data.getSubCategoriesWIthProductsPreview)
    });

    return (
        <div className='container'>
            {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

            {!loading && products.length > 0 &&
                <h1 className={css.heading}>{category}</h1>
            }

            {!loading && !products.length &&
                <p style={{ textAlign: "center" }}>
                    Category "<span style={{ color: 'red' }}>{category}</span>" not found ...
                </p>
            }

            {!loading && products.length > 0 && products.map(({ subCategory, products }) => (
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
            <SEO title={`Products | ${category.charAt(0).toUpperCase() + category.substring(1)}`} />
            <Body category={category} />
        </Layout >
    )
}

export default Category