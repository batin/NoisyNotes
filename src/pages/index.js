import React, { useState } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Section1 from '../components/home-s1'
import '../styles/index.scss'

const IndexPage = () => {
  return (
    <Layout>
      <Seo title='Home' />
      <Section1 />
    </Layout>
  )
}

export default IndexPage
