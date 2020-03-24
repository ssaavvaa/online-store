
import React, { useState } from "react"
import { Link } from 'gatsby'
import Layout from "../layout"
import SEO from "../seo"
import siteMapNav from '../../site-map-nav/profile-info.json'
import css from './info.module.scss'
import moment from 'moment'

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

    const { username, email, picture, creationDate, accountType } = getCurrentUser;

    return (

        <div className='container'>
            <h1 className={css.heading}>My Info</h1>
            <img className={css.image} src={picture} alt='user profile picture' />
            <p><u>Username</u>: {username}</p>
            <p><u>Email</u>: {email}</p>
            <p><u>Account Type</u>: {accountType}</p>
            <p><u>Created</u>: {moment(creationDate).format("dddd, MMMM Do YYYY")}</p>
        </div>

    )
}


export default ({ location }) => (
    <Layout siteMapNav={siteMapNav} location={location} language='en'>
        <SEO title="Profile | Info" />
        <Body />
    </Layout>
)