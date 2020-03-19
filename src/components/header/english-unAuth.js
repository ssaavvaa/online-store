import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import css from './english-unAuth.module.scss'
import id from '../../helpers/id_generator'



export default ({ siteMapNav, fluid, showSideBar, handleSearch }) => {

    return (
        <header className={css.header}>
            <Img className={css.logo} fluid={fluid} />
            <div className={css.input}>
                <input
                    type="text"
                    placeholder="search"
                    onKeyUp={e => handleSearch(e)}
                />
                <i className="fas fa-search"></i>
            </div>
            <Link className={css.signUp} to='/sign-up'>
                <i className="fas fa-sign-in-alt" />
            </Link>
            <Link className={css.cart} to='/sign-up'>
                <i className="fas fa-shopping-cart" />
            </Link>
            <i className={`fas fa-bars ${css.bars}`} onClick={showSideBar} />

            <div className={css.nav}>
                <div>Sponsors</div>
                <div>Hello !</div>
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
                        <Link to='/'>
                            products
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            pictures
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            services
                        </Link>
                    </li>
                </ul>
                <select className={css.language}>
                    <option hidden>Lang</option>
                    <option>en</option>
                </select>

            </div>

        </header>
    )
}

