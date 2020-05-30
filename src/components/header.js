import React, { useContext, useEffect, useState } from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery, Link } from "gatsby"
import { navigate } from "gatsby"
import { AuthContext } from "../services/auth"

const Header = () => {
  const state = useContext(AuthContext)
  const [path, setPath] = useState("")
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

  useEffect(() => {
    if (window) {
      setPath(window.location.pathname)
    }
  })

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
          <Link to="/notes" className={path === "/notes" ? "active" : ""}>
            Notlarım
          </Link>
          <Link to="/">Çıkış Yap</Link>
        </div>
      )}
    </header>
  )
}

export default Header
