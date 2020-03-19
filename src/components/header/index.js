import React from "react"
import $ from "jquery"
import { navigate, useStaticQuery, graphql } from "gatsby"
import EnglishUnAuth from './english-unAuth'
import EnglishAuth from './english-auth'
import { shadow, sidebar } from '../aside/sidebar.module.scss'

const Header = ({ resetStore, siteMapNav, language, location, getCurrentUser }) => {

  const { file: { childImageSharp: { fluid } } } = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      }
    `)

  const handleSearch = e => {
    const { value } = e.target
    if (e.keyCode === 13 && value.length) {

      return navigate(`/${location.pathname}`, { state: { search: value } })
    }

    if (!value.length) {
      return navigate(`/${location.pathname}`, { state: { search: null } })
    }

    return null
  }

  const showSideBar = () => {
    $(`.${sidebar} nav`).show()
    $(`.${shadow}`).fadeIn()
    $(`.${sidebar}`).animate({ width: 'toggle' }, 350);
  }

  if (!getCurrentUser && language === 'en') {
    return <EnglishUnAuth
      handleSearch={handleSearch}
      showSideBar={showSideBar}
      siteMapNav={siteMapNav}
      fluid={fluid} />
  }
  if (getCurrentUser && language === 'en') {
    return <EnglishAuth
      handleSearch={handleSearch}
      showSideBar={showSideBar}
      resetStore={resetStore}
      siteMapNav={siteMapNav}
      getCurrentUser={getCurrentUser}
      fluid={fluid} />
  }
  return <EnglishUnAuth siteMapNav={siteMapNav} fluid={fluid} />
}



export default Header
