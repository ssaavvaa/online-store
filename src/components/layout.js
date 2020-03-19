
import React from "react"
import { navigate } from 'gatsby'
import PropTypes from "prop-types"
import withSession from './with_session'
import Header from "./header"
import Aside from './aside'
import Search from './search'
import "./layout.scss"
import "../fonts/fonts.scss";


const authRoutes = ['/sign-up', '/sign-in']

const Layout = ({ children,
  location,
  siteMapNav = null,
  getCurrentUser,
  resetStore,
  language }) => {

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
  const { search } = location.state

  return (
    <>
      <Header language={language}
        location={location}
        resetStore={resetStore}
        siteMapNav={siteMapNav}
        getCurrentUser={getCurrentUser}
      />

      <main>
        {!search
          ? childWithProps
          : <Search search={search} />
        }
      </main>

      <Aside language={language} />

      <footer>
        © {new Date().getFullYear()}, Built with
          {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withSession(Layout)
