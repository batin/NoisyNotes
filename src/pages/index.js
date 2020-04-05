import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Section1 from '../components/homeS1'
import Section2 from '../components/homeS2'
import '../styles/index.scss'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      {console.log(data)}
      <Seo title='Home' />
      <Section1 data={data.s1Img.childImageSharp.fluid} />
      <Section2
        img1={data.s2Img1.childImageSharp.fluid}
        img2={data.s2Img2.childImageSharp.fluid}
      />
    </Layout>
  )
}

export const query = graphql`
  {
    s1Img: file(relativePath: { eq: "s1.png" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
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
`

export default IndexPage
