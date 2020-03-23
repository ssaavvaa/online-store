import React from "react"
import { Link, navigate } from 'gatsby'
import moment from 'moment'
import Layout from "../layout"
import SEO from "../seo"
import siteMapNav from '../../site-map-nav/profile.json'
import css from './index.module.scss'

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

    const { username, email, creationDate } = getCurrentUser;

    return (

        <div className='container'>
            <h1 className={css.heading}>Profile</h1>
            <p><u>Username</u>: {username}</p>
            <p><u>Email</u>: {email}</p>
            <p><u>Created</u>: {moment(creationDate).format('MMMM Do YYYY')}</p>
            <Link to='profile/products' className={css.toMyCreatedProducts}>My Created Products <i className="fas fa-arrow-right"></i></Link>
            <button
                onClick={() => navigate('/profile/create-product')}
                className={css.button}>
                Create Product
                </button>
        </div>

    )
}

export default ({ location }) => (
    <Layout siteMapNav={siteMapNav} location={location} language='en'>
        <SEO title="Profile" />
        <Body />
    </Layout>
)

