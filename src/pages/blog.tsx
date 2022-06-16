import React, { useState, useLayoutEffect } from "react"
import type { PageProps } from "gatsby"
import { graphql } from "gatsby"
import styled from "styled-components"

import type { Query, MarkdownRemarkFrontmatter } from "Types/GraphQL"
import type Post from "Types/Post"
import useSiteMetadata from "Hooks/useSiteMetadata"
import Layout from "Layouts/layout"
import SEO from "Components/seo"
import PostGrid from "Components/postGrid"
import CategoryFilter from "Components/catetgoryFilter"
import { Content, Main, PostTitle } from "Components/common"

const Blog = ({
  pageContext,
  data,
}: PageProps<Query, MarkdownRemarkFrontmatter>) => {
  const [posts, setPosts] = useState<Post[]>([])
  const currentCategory = pageContext.category
  const postData = data.allMarkdownRemark.edges

  useLayoutEffect(() => {
    const filteredPostData = currentCategory
      ? postData.filter(
          ({ node }) => node?.frontmatter?.category === currentCategory
        )
      : postData

    filteredPostData.forEach(({ node }) => {
      const { id } = node
      const { slug } = node?.fields!
      const { title, desc, date, category, thumbnail, alt } = node?.frontmatter!
      const { childImageSharp } = thumbnail!

      setPosts(prevPost => [
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
        },
      ])
    })
  }, [currentCategory, postData])

  const site = useSiteMetadata()
  const postTitle = currentCategory || site.postTitle

  return (
    <Layout>
      <SEO title="Blog" />
      <Main>
        <Content>
          <CategoryFilter categoryList={data.allMarkdownRemark.group} />
          <PostTitle>Coming soon...</PostTitle>
          {/* <PostGrid posts={posts} /> */}
        </Content>
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query BlogsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(posts/blog)/" } }
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Blog
