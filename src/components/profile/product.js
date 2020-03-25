
import React, { useState } from "react"
import { Link, navigate } from 'gatsby'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PRODUCT } from '../../graphql/queries'
import { DELETE_PRODUCT } from '../../graphql/mutations'
import Layout from "../layout"
import SEO from "../seo"
import css from './product.module.scss'


function Body({ getCurrentUser, _id }) {

    if (!getCurrentUser) {
        return (
            <div className='wrapper'>
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

    const [product, setProduct] = useState(null)
    const [deleted, setDeleted] = useState(false)


    const { loading } = useQuery(GET_PRODUCT, {
        variables: { _id },
        onCompleted: ({ getProduct }) => setProduct(getProduct)
    })

    const [deleteProduct, attrs] = useMutation(DELETE_PRODUCT, {
        variables: { _id },
        onCompleted: () => {
            setDeleted(true)
            return setProduct(null)
        },
        onError: err => console.log(err)
    })



    return (

        <div className='wrapper'>
            <h1 className={css.heading}>Product</h1>
            {loading && <p style={{ textAlign: 'center' }}>Loading</p>}
            {!loading && !product && !deleted && <p style={{ textAlign: 'center' }}>Product with id "{_id}" was not found</p>}
            {product &&
                <div className={css.productWrapper}>

                    <img alt={product.name} src={product.images[0]} />
                    <div>
                        <h3>{product.name}</h3>
                        <p>{product.brand}</p>
                        <p>{product.model}</p>
                    </div>
                </div>
            }
            {deleted && <p>Deleted successfully!</p>}
            {product && <div className={css.buttonWrapper}>
                <button className={css.button} onClick={() => navigate(`/profile/products/${_id}/edit`)}>Edit</button>
                <button className={css.button} onClick={deleteProduct}>{attrs.loading ? 'Deleting...' : 'Delete'}</button>
            </div>}
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
            "name": "My Products",
            "url": "/profile/products"
        },
        {
            "name": "Product",
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