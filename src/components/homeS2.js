import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

const Section1 = () => {
  const data = useStaticQuery(graphql`
    {
      s2Img1: file(relativePath: { eq: "notes.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      s2Img2: file(relativePath: { eq: "play.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <section className="section2">
      <div className="d-flex innerSection">
        <div className="left d-flex flex-column justify-content-center text-center">
          <Img
            className="s2Img1"
            loading="lazy"
            fluid={data.s2Img1.childImageSharp.fluid}
          />
          <h2>Notlarını Kolayca Kaydet</h2>
          <p>
            Vero mi nascetur. Usus's eum ex'se corrupti hic privato hac hitmari
            per in minim ordinum sentiunt.
          </p>
        </div>
        <div className="right d-flex flex-column justify-content-center text-center">
          <Img
            className="s2Img2"
            loading="lazy"
            fluid={data.s2Img2.childImageSharp.fluid}
          />
          <h2>İstediğin Zaman Dinle</h2>
          <p>
            Vero mi nascetur. Usus's eum ex'se corrupti hic privato hac hitmari
            per in minim ordinum sentiunt.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Section1
