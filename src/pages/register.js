import React, { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import "../styles/index.scss"
import { Link, navigate } from "gatsby"

const LoginPage = () => {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
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

  const register = () => {
    navigate("/notes")
  }

  return (
    <Layout pageName="Register">
      <Seo title="Register" />
      <section className="register">
        <div className="container d-flex flex-column justify-content-center align-items-center content">
          <Link>
            <Img
              className="logo"
              loading="lazy"
              fluid={data.headerImg.childImageSharp.fluid}
            />
          </Link>
          <h1 className="mt-5 mb-5">Hadi Başlayalım!</h1>
          <div className="mb-3 mt-5">
            <input
              type="text"
              className="input"
              placeholder="Name"
              aria-label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="input"
              placeholder="Surname"
              aria-label="Surname"
              value={surname}
              onChange={e => setSurname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="input"
              placeholder="E-posta"
              aria-label="E-posta"
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
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
          <button onClick={register} className="btn button dark">
            Üye Ol
          </button>
          <p>
            Hesap oluşturarak, <Link to="/register">Gizlilik Politikası</Link>,{" "}
            <Link to="/register">Kullanım Koşulları</Link>, ve{" "}
            <Link to="/register">Çerez Politikasını</Link> kabul etmiş
            olursunuz.
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center footer">
          <h5>
            Hesabın var mı?
            <Link to="/login"> Giriş Yap </Link>
          </h5>
        </div>
      </section>
    </Layout>
  )
}

export default LoginPage
