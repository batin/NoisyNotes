import React from "react"
import PropTypes from "prop-types"
import Header from "./header"

const Layout = ({ children, pageName }) => {
  const isHeaderEnabled = () => {
    return pageName === ("Home" || "404")
  }

  return (
    <>
      {isHeaderEnabled() ? <Header /> : <div />}
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
