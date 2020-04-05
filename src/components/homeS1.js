import React from 'react'
import { graphql } from "gatsby"
import Img from 'gatsby-image'

const section1 = ({ data }) => {
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
          fluid={data}
        />
      </div>
    </section>
  )
}

export default section1