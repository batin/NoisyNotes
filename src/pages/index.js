import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Section1 from '../components/homeS1'
import Section2 from '../components/homeS2'
import '../styles/index.scss'

const IndexPage = () => {
  return (
    <Layout>
      <Seo title='Home' />
      <Section1 />
      <Section2 />
    </Layout>
  )
}

export default IndexPage
