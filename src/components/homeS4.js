import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

const Section4 = () => {
  const data = useStaticQuery(graphql`
    {
      s1Img: file(relativePath: { eq: "logo_light.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)
  return (
    <section className="section4">
      <div className="container-fluid justify-content-around d-flex h-100">
        <div className="align-self-center my-auto">
          <Img
            className="s4Img"
            loading="lazy"
            fluid={data.s1Img.childImageSharp.fluid}
          />
          <h5>Size nasıl yardımcı olabiliriz?</h5>
          <p>0800 100 10 00</p>
          <a href="mailto:batineryilmaz@icloud.com">destek@noisynotes.com</a>
        </div>
        <div className="align-self-center mt-4 mr-4">
          <h5>Takip Et</h5>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
          <p>Github</p>
        </div>
      </div>
    </section>
  )
}

export default Section4
