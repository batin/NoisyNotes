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
  })
  const [error, setError] = useState(false)
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

  const register = async () => {
    try {
      const formdata = new FormData()
      formdata.append("username", email)
      formdata.append("password", pass)
      formdata.append("name", name)
      formdata.append("surname", surname)
      const signup = await axios({
        method: "POST",
        url: "https://noisy-notes.herokuapp.com/signup",
        data: formdata,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      const formdata2 = new FormData()
      formdata2.append("username", email)
      formdata2.append("password", pass)
      const login = await axios({
        method: "POST",
        url: "https://noisy-notes.herokuapp.com/login",
        data: formdata2,
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
      await state.setUser(signup.data.User)
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
    <Layout pageName="Register">
      <Seo title="Register" />
      <section className="register">
        {error ? (
          <div
            class="alert alert-danger position-absolute justify-content-end mt-2 mr-2"
            role="alert"
          >
            Kayıt Başarısız
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
          <h1 className="mt-3 mb-3">Hadi Başlayalım!</h1>
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
            <Link to="/login/"> Giriş Yap </Link>
          </h5>
        </div>
      </section>
    </Layout>
  )
}

export default LoginPage
