import React, { useLayoutEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import type { Query } from "Types/GraphQL"
import Layout from "Layouts/layout"
import SEO from "Components/seo"
import Markdown from "Styles/markdown"
import { rhythm } from "Styles/typography"
import Post from "Types/Post"
import { Content, PostTitle } from "Components/common"
import Card from "Components/postGrid/card"
import PostGrid from "Components/postGrid"
import { Grid } from "Components/postGrid/postGrid"

type QueryResult = {
  aboutInfo: Query['allMarkdownRemark']
  jobs: Query['allMarkdownRemark']
  msoeIcon: Query['file']
}

const About = () => {
  const data = useStaticQuery<QueryResult>(graphql`
    query {
      aboutInfo: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
        edges {
          node {
            html
          }
        }
      }

      msoeIcon: file(absolutePath: {regex: "/msoe.jpg/"}) {
        childImageSharp {
          id
        }
        base
      }

      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/jobs/" } }
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
  `)

  const [jobs, setJobs] = useState<Post[]>([])
  const jobsData = data.jobs.edges

  useLayoutEffect(() => {
      jobsData.forEach(({ node }) => {
      const { id } = node
      const { slug } = node?.fields!
      const { title, desc, date, category, thumbnail, alt } = node?.frontmatter!
      const { childImageSharp } = thumbnail!

      setJobs(prevJob => [
        ...prevJob,
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
  }, [jobsData])

  
  const markdown = data.aboutInfo.edges[0].node.html

  return (
    <Layout>
      <SEO title="About" />
      <Container
        dangerouslySetInnerHTML={{ __html: markdown ?? "" }}
        rhythm={rhythm}
      />
      <Content>
        <PostTitle>Work Experience</PostTitle>
        <PostGrid posts={jobs} />
      </Content>
      <Content>
        <PostTitle>Education</PostTitle>
        <Grid>
          <Card
            thumbnail={data.msoeIcon?.childImageSharp?.id}
            alt={"Milwaukee School of Engineering"}
            category={"Education"}
            title={"Milwaukee School of Engineering"}
            desc={"Bachelors of Science in Software Engineering"}
            date={"2018-05-01"}
          />
        </Grid>
      </Content>
    </Layout>
  )
}

const Container = styled(Markdown).attrs({
  as: "main",
})`
  width: var(--post-width);
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 6rem;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-top: var(--sizing-xl);
    width: 87.5%;
  }

  h1 {
    margin-bottom: 2rem;
  }

  h2 {
    margin-top: var(--sizing-lg);

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.75rem;
    }
  }

  h3 {
    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.25rem;
    }
  }
`

export default About
