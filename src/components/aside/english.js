import React from "react"
import { Link } from 'gatsby'
import $ from 'jquery'
import css from './sidebar.module.scss'

export default function () {

    function handleClose({ target: { dataset: { close } } }) {
        if (close === 'true') {
            $(`.${css.sidebar} nav`).hide()
            $(`.${css.sidebar}`).animate({ width: 'toggle' }, 350)
            setTimeout(() => {
                $(`.${css.shadow}`).fadeOut()
            }, 350);
        }
        window.onscroll = function () { };
        return null;
    }

    function handleSubMenu({ currentTarget }) {
        $(currentTarget).find('ul').slideToggle()
        $(currentTarget).find('i').toggleClass(css.rotateCross)
    }

    return (
        <div data-close="true" onClick={handleClose} className={css.shadow}>
            <aside className={css.sidebar}>
                <i data-close="true" className={`fas fa-times ${css.close}`} />
                <nav>
                    <Link to="/"><i className="fas fa-arrow-left"></i><span>Home</span></Link>
                    <div onClick={handleSubMenu}>
                        <i className="fas fa-plus"></i>
                        <p>Products</p>
                        <ul>
                            <li><Link to="/about">Clothes</Link></li>
                            <li><Link to="/about">Shoes</Link></li>
                            <li><Link to="/about">Sport</Link></li>
                        </ul>
                    </div>
                    <Link to="/about"><i className="fas fa-arrow-left"></i><span>About</span></Link>
                    <Link to="/sign-in"><i className="fas fa-arrow-left"></i><span>Sign In</span></Link>
                    <Link to="/sign-up"><i className="fas fa-arrow-left"></i><span>Sign Up</span></Link>

                </nav>
            </aside>
        </div>
    )
}