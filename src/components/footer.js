import React, { useState, useEffect } from "react"
import css from './footer.module.scss'

function Footer() {


    return (
        <footer className={css.footer}>
            <p>© {new Date().getFullYear()} || ssaavvaa store</p>
        </footer>

    )
}


export default Footer;