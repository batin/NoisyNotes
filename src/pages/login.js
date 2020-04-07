import React, { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import "../styles/index.scss"
import { Link } from "gatsby"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
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

  const login = () => {
    console.log("login")
  }

  return (
    <Layout pageName="Login">
      <Seo title="Login" />
      <section className="login">
        <div className="container d-flex flex-column justify-content-center align-items-center content">
          <Img
            className="logo"
            loading="lazy"
            fluid={data.headerImg.childImageSharp.fluid}
          />
          <h1 className="mt-5 mb-5">Hoşgeldin!</h1>
          <div className="mb-3 mt-5">
            <input
              type="email"
              className="input"
              placeholder="E-posta"
              aria-label="E-posta"
              aria-describedby="basic-addon1"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              className="input"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
          <button onClick={login} className="btn button">
            Giriş Yap
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center footer">
          <h5>
            Hesabın yok mu?
            <Link to="/register"> Üye Ol</Link>
          </h5>
        </div>
      </section>
    </Layout>
  )
}

export default LoginPage
