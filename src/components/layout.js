
import React, { useState, useEffect } from "react"
import { navigate } from 'gatsby'
import PropTypes from "prop-types"
import withSession from './with_session'
import Header from "./header"
import Aside from './aside'
import Search from './search'
import Footer from './footer'
import { handleScroll } from '../helpers/handleScroll'
import "./layout.scss"
import "../fonts/fonts.scss";


let currentTop = 0;

const authRoutes = ['/sign-up', '/sign-in']

function Layout({ children,
  location,
  categories,
  siteMapNav = null,
  getCurrentUser,
  resetStore,
  language = 'en' }) {

  const [searchQuery, setSearchQuery] = useState('')


  useEffect(() => {

    if (document.readyState === "complete") {
      if (location.state) {
        location.state.search = null;
      }
    }
    window.addEventListener('scroll', handleScroll)
  }, []);


  useEffect(() => {
    location.state && location.state.search
      ? setSearchQuery(location.state.search)
      : setSearchQuery('')
  }, [location.state])

  if (authRoutes.includes(location.pathname) && getCurrentUser) {
    navigate('/')
    return null
  }

  const childWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {
      language,
      location,
      getCurrentUser,
    })
  );


  return (
    <>
      <Header
        language={language}
        location={location}
        resetStore={resetStore}
        siteMapNav={siteMapNav}
        getCurrentUser={getCurrentUser}
      />

      {searchQuery &&
        <main>
          <Search location={location} searchQuery={searchQuery} />
        </main>
      }

      <main style={searchQuery ? { display: "none" } : null}>
        {childWithProps}
      </main>

      <Aside
        getCurrentUser={getCurrentUser}
        language={language}
        categories={categories}
        resetStore={resetStore}
      />

      <Footer />

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withSession(Layout)
