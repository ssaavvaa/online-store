import React from "react"
import { Link } from 'gatsby'
import Layout from "../layout"
import SEO from "../seo"
import siteMapNav from '../../site-map-nav/profile.json'
import css from './index.module.scss'

function Body() {

    return (

        <div className='wrapper'>
            <h1 className={css.heading}>Profile</h1>
            <header className={css.header}>
                <ul>
                    <li>
                        <Link to='/profile/info'>My Info</Link>

                    </li>
                    <li>
                        <Link to='/profile/products'>My Products</Link>

                    </li>
                    <li>
                        <Link to='/profile/products'>Waiting for approval</Link>

                    </li>
                    <li>
                        <Link to='/profile/create-product'>Create Product</Link>

                    </li>
                    <li>
                        <Link to='/profile/products'>My purchases</Link>

                    </li>
                </ul>
            </header>
        </div>

    )
}

export default ({ location }) => (
    <Layout siteMapNav={siteMapNav} location={location} language='en'>
        <SEO title="Profile" />
        <Body />
    </Layout>
)

