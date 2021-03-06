import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import css from './english-auth.module.scss'
import id from '../../helpers/id_generator'



export default function ({
    siteMapNav,
    fluid,
    resetStore,
    getCurrentUser,
    showSideBar,
    handleSearch,
    location }) {

    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const query = location.state && location.state.search
            ? location.state.search
            : ""
        return setSearchQuery(query)
    }, [location.state])

    function handleSignOut() {
        localStorage.setItem('ssaavvaa-token', null);
        return resetStore()
    }

    return (
        <header className={css.header}>
            <Img className={css.logo} fluid={fluid} />
            <div className={css.input}>
                <input
                    value={searchQuery}
                    onInput={({ target: { value } }) => handleSearch(value)}
                    onChange={({ target: { value } }) => setSearchQuery(value)}
                    type="text"
                    placeholder="search"

                />
                <i className="fas fa-search"></i>
            </div>
            <i onClick={handleSignOut} className={`fas fa-sign-out-alt ${css.signUp}`} />

            <Link title="Cart" className={css.cart} to='/cart'>
                <i className="fas fa-shopping-cart" />
            </Link>
            <Link title="Profile" className={css.userLogo} to='/profile'>
                <i className="fas fa-user"></i>
            </Link>


            <i onClick={showSideBar} className={`fas fa-bars ${css.bars}`} />

            <div className={css.nav}>
                <div>Sponsors</div>
                <div>Hello: {getCurrentUser.username} !</div>
                <nav>
                    {siteMapNav ?
                        siteMapNav.map(({ name, url }) => (
                            <Link key={id()} to={url}>{name}</Link>
                        ))
                        : <Link key={id()} to='/'>Home</Link>
                    }
                </nav>
                <ul className={css.options}>
                    <li>
                        <Link to='/products'>
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            Pictures
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            Services
                        </Link>
                    </li>
                </ul>
                <select className={css.language}>
                    <option hidden>Lang</option>
                    <option>en</option>
                </select>

            </div>

        </header >
    )
}

