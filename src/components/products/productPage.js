import React, { useState } from "react"
import moment from 'moment'
import Layout from '../layout'
import css from './productPage.module.scss'
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT } from '../../graphql/queries'
import SEO from '../seo'


function Body({ _id }) {

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        images: [],
        description: "",
        model: "",
        price: 0,
        feedbacks: []
    })

    const [error, setError] = useState(null)

    const { loading } = useQuery(GET_PRODUCT, {
        variables: { _id },
        onCompleted: ({ getProduct }) => setProduct(getProduct),
        onError: () => setError(true)
    })

    const { name,
        brand,
        images,
        model,
        description,
        price,
        feedbacks } = product;



    return <div className='wrapper'>
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {error && <p > <span style={{ color: 'red' }}>Error: </span> Product with id "{_id}" not found</p>}
        {!loading && !error &&
            <>
                <h1 className={css.heading}>{name}</h1>
                <div className={css.topSection}>
                    <img alt="product image" src={images[0]} />
                    <div>
                        <p>Name: {name}</p>
                        <p>Brand: {brand}</p>
                        <p>Model: {model}</p>

                        <p>Price: {price}</p>
                    </div>
                </div>
                <div className={css.description}>
                    <h3 style={{ textAlign: 'center' }}>DESCRIPTION</h3>
                    {<p>{description}</p>}
                </div>
                <div className={css.feedbacks}>
                    {!feedbacks.length && <p style={{ textAlign: "center" }}>No feedbacks yet...</p>}
                    {feedbacks.length > 0 &&
                        <>
                            <h3 style={{ textAlign: 'center' }}>FEEDBACKS</h3>
                            <ul>
                                {feedbacks.map(({ _id, feedback, creationDate, author: { username } }) =>
                                    <li key={_id}>
                                        <p><u>Author</u> : {username}</p>
                                        <p> {feedback}</p>
                                        <p>{moment({ creationDate }).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                    </li>)
                                }
                            </ul>
                        </>
                    }
                </div>

            </>
        }
    </div>
}


function ProductPage({ location, category, subcategory, _id }) {
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
            <SEO title={
                `Products 
                 | ${category.charAt(0).toUpperCase() + category.substring(1)}
                 | ${subcategory.charAt(0).toUpperCase() + subcategory.substring(1)}
                 | ${_id}
                 `} />
            <Body _id={_id} />
        </Layout >
    )
}

export default ProductPage