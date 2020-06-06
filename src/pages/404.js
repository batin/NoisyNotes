import React from "react"
import logo from "../images/logo_light.svg"
import Footer from "../components/Footer"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/index.scss"
import "../styles/404.scss"

const NotFoundPage = () => (
  <Layout pageName="404">
    <SEO title="404: Not found" />
    <div className="d-flex flex-column justify-content-center align-items-center page404">
      <h2 className="m-auto">PAGE NOT FOUND</h2>
    </div>
    <Footer />
  </Layout>
)

export default NotFoundPage
