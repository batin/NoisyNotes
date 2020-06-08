import React, { useState, useContext, useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import "../styles/index.scss"
import { Link, navigate } from "gatsby"
import { AuthContext } from "../services/auth"
import axios from "axios"

const LoginPage = () => {
  const state = useContext(AuthContext)
  useEffect(() => {
    if (state.user) {
      navigate("/notes/")
    }
  }, [])
  const [error, setError] = useState(false)
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

  const login = async () => {
    try {
      const formdata = new FormData()
      formdata.append("username", email)
      formdata.append("password", pass)
      const login = await axios({
        method: "POST",
        url: "https://noisy-notes.herokuapp.com/login",
        data: formdata,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      const me = await axios({
        method: "GET",
        url: "https://noisy-notes.herokuapp.com/user/me",
        headers: { Authorization: `Bearer ${login.data.Token}` },
      })

      await state.login(me.data, login.data.Token)
      await navigate("/notes/")
    } catch (err) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
      console.log(err)
    }
  }

  return (
    <Layout pageName="Login">
      <Seo title="Login" />
      <section className="login">
        {error ? (
          <div
            class="alert alert-danger position-absolute justify-content-end mt-2 mr-2"
            role="alert"
          >
            Giriş Başarısız
          </div>
        ) : (
          <div />
        )}
        <div className="container d-flex flex-column justify-content-center align-items-center content">
          <Link to="/">
            <Img
              className="logo"
              loading="lazy"
              fluid={data.headerImg.childImageSharp.fluid}
            />
          </Link>
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
            <Link to="/register/"> Üye Ol</Link>
          </h5>
        </div>
      </section>
    </Layout>
  )
}

export default LoginPage
