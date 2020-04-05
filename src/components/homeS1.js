import React from 'react'
import Img from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

const Section1 = () => {
  const data = useStaticQuery(graphql`
    {
      s1Img: file(relativePath: { eq: "s1.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <section className='section1'>
      <div className='container d-flex flex-column innerSection'>
        <h1 className='text-center'>
          Noisy Notes, senin için not tutar.
        </h1>
        <p className='text-center'>
          Not tutmayı denediniz ve
          bir süre sonra yorulup devam etmeyi bıraktınız değil mi?
          Hadi, notlarınızı sesli olarak tutun!
        </p>
        <button className='btn'>Ücretsiz Üye Ol</button>
        <Img
          className='s1Img'
          loading='lazy'
          fluid={data.s1Img.childImageSharp.fluid}
        />
      </div>
    </section>
  )
}

export default Section1
