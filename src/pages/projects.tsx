import React, { useState, useLayoutEffect } from "react"
import type { PageProps } from "gatsby"
import { graphql } from "gatsby"

import type { Query } from "Types/GraphQL"
import type Post from "Types/Post"
import Layout from "Layouts/layout"
import SEO from "Components/seo"
import PostGrid from "Components/postGrid"
import { Content, Main, PostTitle } from "Components/common"

const Projects = ({
  data,
}: PageProps<Query>) => {
  const [projects, setProjects] = useState<Post[]>([])
  const postData = data.allMarkdownRemark.edges

  useLayoutEffect(() => {
      postData.forEach(({ node }) => {
      const { id } = node
      const { slug } = node?.fields!
      const { title, desc, date, category, thumbnail, alt } = node?.frontmatter!
      const { childImageSharp } = thumbnail!

      setProjects(prevPost => [
        ...prevPost,
        {
          id,
          slug,
          title,
          desc,
          date,
          category,
          thumbnail: childImageSharp?.id,
          alt,
          url: (node.frontmatter! as any).url
        },
      ])
    })
  }, [postData])

  return (
    <Layout>
      <SEO title="Projects" />
      <Main>
        <Content>
          <PostTitle>Personal Projects</PostTitle>
          <PostGrid posts={projects} />
        </Content>
      </Main>

    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            category
            date(formatString: "YYYY-MM-DD")
            desc
            thumbnail {
              childImageSharp {
                id
              }
              base
            }
            alt
            url
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Projects
