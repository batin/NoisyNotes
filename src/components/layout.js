import React, { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { AuthContext } from "../services/auth"

const Layout = ({ children, pageName }) => {
  const state = useContext(AuthContext)

  useEffect(() => {
    if (document.cookie !== "") {
      state.setToken(document.cookie.split("=")[1])
    } else {
      state.logout()
    }
  }, [])

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
