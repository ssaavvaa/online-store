import React from "react"
import css from './404.module.scss'

const NotFoundPage = () => (

  <div className='container'>
    <h1 className={css.heading}>PAGE NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
)

export default NotFoundPage
