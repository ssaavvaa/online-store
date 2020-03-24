
import React from "react"
import { Link } from 'gatsby'
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT } from '../../graphql/queries'
import Layout from "../layout"
import SEO from "../seo"
import css from './editProduct.module.scss'


function Body({ getCurrentUser, _id }) {

    if (!getCurrentUser) {
        return (
            <div className='container'>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: '24px'
                    }}
                >Please
                  <Link style={{ marginLeft: '20px' }} to='/sign-in' >Sign In</Link>
                </p>
                <p
                    style={{
                        textAlign: 'center'
                    }}
                >To view your profile...</p>
            </div>
        )
    }

    useQuery(GET_PRODUCT, {
        variables: { _id },
        onCompleted: ({ getProduct }) => console.log(getProduct),
        onError: err => console.log(err)
    })

    return (

        <div className='container'>
            <h1 className={css.heading}>Edit Product</h1>


        </div>

    )
}


export default ({ location, _id }) => {

    const siteMapNav = [
        {
            "name": "Home",
            "url": "/"
        },
        {
            "name": "Profile",
            "url": "/profile"
        },
        {
            "name": "Products",
            "url": "/profile/products"
        },
        {
            "name": "Edit Product",
            "url": `/profile/products/${_id}`
        }
    ]

    return (
        <Layout siteMapNav={siteMapNav} location={location} language='en'>
            <SEO title="Profile | Info" />
            <Body _id={_id} />
        </Layout>
    )
}