
import React, { useState } from "react"
import { useQuery } from '@apollo/react-hooks';
import Layout from "../layout"
import SEO from "../seo"
import { GET_USER_ALL_CREATED_PRODUCTS } from '../../graphql/queries'
import siteMapNav from '../../site-map-nav/profile-products.json'
import css from './products.module.scss'

function Body({ getCurrentUser }) {

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

    const [products, setProducts] = useState([])


    const { _id } = getCurrentUser;

    const { loading } = useQuery(GET_USER_ALL_CREATED_PRODUCTS, {
        variables: { _id },
        onCompleted: ({ getUserAllCreatedProducts }) => setProducts(getUserAllCreatedProducts),
        onError: err => console.log(err)
    })

    return (

        <div className='container'>
            <h1 className={css.heading}>Products</h1>
            {loading && <p style={{ textAlign: 'center' }}>Loading</p>}
            {!loading && !products.length && <p style={{ textAlign: "center" }}> You haven't created any products yet ...</p>}
            {!loading && products.length > 0 &&
                <ul className={css.myProducts}>
                    {products.map(({ images, name }) => (
                        <li>
                            <p>{name}</p>
                            <img alt='name' src={images[0]} />
                        </li>
                    ))}
                </ul>
            }
        </div>

    )
}


export default ({ location }) => (
    <Layout siteMapNav={siteMapNav} location={location} language='en'>
        <SEO title="Profile | Products" />
        <Body />
    </Layout>
)