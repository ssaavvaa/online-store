import React from "react"
import $ from "jquery"
import { navigate, useStaticQuery, graphql } from "gatsby"
import EnglishUnAuth from './english-unAuth'
import EnglishAuth from './english-auth'
import { shadow, sidebar } from '../aside/sidebar.module.scss'




function Header({ resetStore, siteMapNav, language, location, getCurrentUser }) {

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

  function handleSearch({ target: { value } }) {

    if (value.length) {
      return navigate(`/${location.pathname}`, { state: { search: value } })
    }

    if (!value.length) {
      return navigate(`/${location.pathname}`, { state: { search: null } })
    }

    return null
  }

  function showSideBar() {
    $(`.${sidebar} nav`).show()

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };


    $(`.${shadow}`).fadeIn()
    return $(`.${sidebar}`).animate({ width: 'toggle' }, 350);
  }

  if (!getCurrentUser && language === 'en') {
    return <EnglishUnAuth
      location={location}
      handleSearch={handleSearch}
      showSideBar={showSideBar}
      siteMapNav={siteMapNav}
      fluid={fluid} />
  }
  if (getCurrentUser && language === 'en') {
    return <EnglishAuth
      location={location}
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
