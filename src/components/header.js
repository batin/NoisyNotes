import React, { useContext } from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery, Link } from "gatsby"
import { navigate } from "gatsby"
import { GlobalDispatchContext, GlobalStateContext } from "../services/auth"

const Header = () => {
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)
  const data = useStaticQuery(graphql`
    {
      headerImg: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)
  return (
    <header className="container-fluid d-flex w-100 header justify-content-between">
      <Img
        className="header-img"
        loading="lazy"
        fluid={data.headerImg.childImageSharp.fluid}
      />

      {state.user ? (
        <div className="d-flex buttons">
          <button
            onClick={() => {
              navigate("/login")
            }}
            className="btn btn-1"
          >
            Giriş yap
          </button>
          <button
            onClick={() => {
              navigate("/register")
            }}
            className="btn btn-2"
          >
            Üye ol
          </button>
        </div>
      ) : (
        <div className="d-flex navigators">
          <Link
            to="/notes"
            className={window.location.pathname === "/notes" ? "active" : ""}
          >
            Notlarım
          </Link>
          <Link to="/">Çıkış Yap</Link>
        </div>
      )}
    </header>
  )
}

export default Header
