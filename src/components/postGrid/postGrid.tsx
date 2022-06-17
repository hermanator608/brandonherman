import React, { useRef } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import type Post from "Types/Post"
import Card from "./card"
import useInfiniteScroll from "./useInfiniteScroll"
import { ThumbnailWrapper } from "./card/centeredImg"
import { Maybe } from "Types/GraphQL"

interface PostGridProps {
  posts: Post[]
}

const ConditionalLink: React.FC<{url?: Maybe<string>, ariaLabel: string, slug?: Maybe<string>}> = ({url, ariaLabel, slug, children}) => {
  if (!!url) {
    return <a href={url} aria-label={ariaLabel} target='_blank'>{children}</a>;
  } else {
    return <Link to={url ?? slug ?? ""} aria-label={ariaLabel}>{children}</Link>
  }
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const scrollEdgeRef = useRef<HTMLDivElement>(null)
  const currentList = useInfiniteScroll({
    posts,
    scrollEdgeRef,
    maxPostNum: 10,
    offsetY: 200,
  }) 

  return (
    <Grid role="list">
      {currentList.map(data => {
        const { id, title, desc, date, category, thumbnail, alt, ...rest } = data
        const ariaLabel = `${title} - ${category} - Posted on ${date}`
        
        return (
          <List key={id} role="listitem">
            <ConditionalLink ariaLabel={ariaLabel} {...rest}>
              <Card
                thumbnail={thumbnail}
                alt={alt}
                category={category}
                title={title}
                desc={desc}
                date={date}
              />
            </ConditionalLink>
          </List>
        )
      })}
      <div ref={scrollEdgeRef} />
    </Grid>
  )
}

export const Grid = styled.ul`
  display: grid;
  grid-gap: var(--grid-gap-xl);
  grid-template-columns: repeat(2, 1fr);
  list-style: none;

  & > li {
    margin-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    grid-gap: var(--grid-gap-lg);

    grid-template-columns: 1fr;
  }
`

const List = styled.li`
  box-sizing: border-box;
  grid-column: span 1;

  a {
    display: block;
    height: 100%;
  }

  a:hover ${ThumbnailWrapper}::after, a:focus ${ThumbnailWrapper}::after {
    opacity: 1;
  }

  & .gatsby-image-wrapper {
    transition: opacity 1s ease-out, transform 0.5s ease;
  }

  a:hover,
  a:focus {
    .gatsby-image-wrapper {
      transform: scale(1.03);
    }
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    grid-column: span 1;
  }
`

export default PostGrid
