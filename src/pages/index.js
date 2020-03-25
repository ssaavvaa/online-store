import React from "react"
import Slider from "react-slick";
import { graphql } from 'gatsby'
import Img from "gatsby-image"
import css from './index.module.scss'
import Layout from "../components/layout"
import SEO from "../components/seo"
import settings from '../helpers/carousel settings.json'
import idGen from '../helpers/id_generator'


function Body({ productsGallery }) {

  const images = productsGallery.edges.map(({ node: { childImageSharp: { fluid } } }) => (
    <li key={idGen()}>
      <Img fluid={fluid} />
    </li>
  ))

  return (

    <div className='wrapper'>
      <h1 className={css.heading}>STORE</h1>
      <div className={css.asidePhotos}>
        <h3>New Arrivals</h3>
        <ul >
          {images}
        </ul>
      </div>

      <Slider {...settings} className={css.slider}>
        {images}
      </Slider>
    </div>

  )
}

export default ({ data: { antonImage, productsGallery }, location }) => (
  <Layout location={location} language='en'>
    <SEO title="Home" />
    <Body
      antonImage={antonImage}
      productsGallery={productsGallery}
    />
  </Layout>
)



export const indexPageDataQuery = graphql`
  query indexPageDataQuery{
    antonImage: file(relativePath: { eq: "anton.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      productsGallery:allFile(
        limit: 6
        filter: {
         extension: {regex:"/(jpg)|(png)/"}
         absolutePath: { regex : "/images/products/"} 
      }){
    edges{
      node{
        childImageSharp{
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
  }`
