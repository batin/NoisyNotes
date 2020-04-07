import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import { navigate } from "gatsby"

const Header = () => {
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
      <div className="d-flex buttons">
        <button
          onClick={() => {
            navigate("/login")
          }}
          className="btn btn-1"
        >
          {" "}
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
    </header>
  )
}

export default Header
