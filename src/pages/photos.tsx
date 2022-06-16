import React from "react"
import type { PageProps } from "gatsby"
import { graphql } from "gatsby"

import Layout from "Layouts/layout"
import SEO from "Components/seo"

import Gallery from '@browniebroke/gatsby-image-gallery'
import { Query } from "Types/GraphQL"
import { Content, Main } from "Components/common"

const Photos = ({
  data,
}: PageProps<Query>) => {
  console.log(data)
  const images = data.allFile.edges.map(({ node }) => node.childImageSharp!)

  // `images` is an array of objects with `thumb` and `full`
  return (
    <Layout>
      <SEO title="Pictures" />
      <Main>
        <Content>
          {/* TODO: Look into adding infinite scroll */}
          <Gallery images={images as any} />
        </Content>
      </Main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ImagesForGallery {
    allFile(filter: {relativeDirectory: {eq: "images/photos"}}) {
      edges {
        node {
          childImageSharp {
            thumb: gatsbyImageData(
              width: 270
              height: 270
              placeholder: TRACED_SVG
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`

export default Photos;