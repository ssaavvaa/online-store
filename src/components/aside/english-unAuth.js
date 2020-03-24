import React from "react"
import { Link } from 'gatsby'
import $ from 'jquery'
import css from './sidebar.module.scss'
import idGen from '../../helpers/id_generator'

export default function ({ categories }) {

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

    function handleCloseSideBar() {
        $(`.${css.sidebar}`).hide()
        $(`.${css.shadow}`).fadeOut()
    }

    function handleSubMenu({ target }) {
        $(target).siblings('ul').slideToggle()
        $(target).siblings('i').toggleClass(css.rotateCross)
    }

    function handleShowSubCategories({ currentTarget }) {
        $(currentTarget).find("p").find('i').toggleClass(css.rotateCross)
        $(currentTarget).find('ul').slideToggle()

    }


    return (
        <div data-close="true" onClick={handleClose} className={css.shadow}>
            <aside className={css.sidebar}>
                <i data-close="true" className={`fas fa-times ${css.close}`} />
                <nav>
                    <Link to="/"><i className="fas fa-arrow-left"></i><span>Home</span></Link>
                    <div>
                        <i className="fas fa-plus"></i>
                        <p onClick={handleSubMenu}>Products</p>
                        <ul className={css.categories}>
                            {categories.map(({ category, subCategories }) => (
                                <li onClick={handleShowSubCategories} key={idGen()}>
                                    <p>
                                        {category.charAt(0).toUpperCase() + category.substring(1)}
                                        <i className={`fas fa-times`} />
                                    </p>


                                    <ul className={css.subCategories}>
                                        {subCategories.map(subCategory => (
                                            <li key={idGen()}>
                                                <Link
                                                    onClick={handleCloseSideBar}
                                                    to={`/products/${category}/${subCategory}`}
                                                >
                                                    {subCategory.charAt(0).toUpperCase() + subCategory.substring(1)}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to="/about"><i className="fas fa-arrow-left"></i><span>About</span></Link>

                    <Link to="/sign-in" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>

                        <span>Sign In</span>
                    </Link>
                    <Link to="/sign-up">

                        <span>Sign Up</span>
                    </Link>


                </nav>
            </aside>
        </div>
    )
}