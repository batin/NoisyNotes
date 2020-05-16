import React from "react"
import PropTypes from "prop-types"
import Header from "./header"

const Layout = ({ children, pageName }) => {
  const isHeaderEnabled = () => {
    return pageName === "Home" || pageName === "404" || pageName === "Notlarım"
  }

  return (
    <>
      {isHeaderEnabled() ? <Header /> : <div />}
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
