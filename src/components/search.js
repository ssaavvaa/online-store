import React from "react"
import css from './search.module.scss'

export default ({ search }) => {

    return (
        <div className={css.container}>
            <h1>Search</h1>
            <p>Search results for {search}</p>
        </div>
    )
}