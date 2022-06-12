import React, { useState, useLayoutEffect } from "react"
import type { PageProps } from "gatsby"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "Layouts/layout"
import SEO from "Components/seo"

import Gallery from '@browniebroke/gatsby-image-gallery'
import { Query } from "Types/GraphQL"

const Photos = ({
  data,
}: PageProps<Query>) => {
  console.log(data)
  const images = data.allFile.edges.map(({ node }) => node.childImageSharp!)

  // `images` is an array of objects with `thumb` and `full`
  return (
    <Layout>
      <SEO title="Blog" />
      <Main>
        <Content>
          <Gallery images={images as any} />
        </Content>
      </Main>
    </Layout>
  );
}

const Main = styled.main`
  min-width: var(--min-width);
  min-height: calc(100vh - var(--nav-height) - var(--footer-height));
  background-color: var(--color-background);
`

const Content = styled.div`
  box-sizing: content-box;
  width: 87.5%;
  max-width: var(--width);
  padding-top: var(--sizing-lg);
  padding-bottom: var(--sizing-lg);
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding-top: var(--grid-gap-lg);
    width: 87.5%;
  }
`

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