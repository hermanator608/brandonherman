import styled from "styled-components"

export const Main = styled.main`
  min-width: var(--min-width);
  min-height: calc(100vh - var(--nav-height) - var(--footer-height));
  background-color: var(--color-background);
`

export const Content = styled.div`
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

export const PostTitle = styled.h2`
  font-size: 2rem;
  font-weight: var(--font-weight-extra-bold);
  margin-bottom: var(--sizing-md);
  line-height: 1.21875;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: 1.75rem;
  }
`