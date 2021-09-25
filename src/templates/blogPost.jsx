import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Seo from '../components/seo'
import Section from '../components/section'

const BannerSection = styled(Section)`
    ${({theme}) => theme.media.small`
        width: 100%;
        padding: 0;
        margin-top: 2rem;
    `}
`

const Banner = styled(Image)`
    max-width: 1312px;
    width: 100%;
    max-height: 600px;
    height: 40vw;
`

const BlogContentSection = styled(Section)`
    max-width: 1024px;
    margin: 0 auto;
`

const DateField = styled.p`
    margin: 2rem 0 0;
    color: ${({theme}) => theme.text2};
    font-size: 1rem;
`

const Title = styled.h1`
    font-weight: 500;
    margin: 8px 0 0;
    line-height: 4.5rem;

    ${({theme}) => theme.media.small`
        font-size: 3rem;
        line-height: 3.5rem;
    `}

    ${({theme}) => theme.media.extraSmall`
        font-size: 2rem;
        line-height: 2.5rem;
    `}
`

const BlogBody = styled.div`
    margin: 100px auto 0;
    max-width: 680px;

    & img {
        width: 100%;
    }

    & h1 {
        font-size: 36px;
        font-weight: 500;
        line-height: 1;
        margin: 3rem 0 1.25rem;
        scroll-margin-top: 6.5rem;
    }

    & h2 {
        font-size: 28px;
        font-weight: 500;
        line-height: 1;
    }

    & h3 {
        font-size: 20px;
        font-weight: 500;
        line-height: 1;
    }

    & ul, & ol {
        color: ${({theme}) => theme.text1};
    }

    & hr {
        border-color: ${({theme}) => theme.text2};
        border-width: 1px 0 0;
        width: 90%;
        margin: 2rem auto;
    }

    & p {
        margin: 0 0 1.5rem;
        font-size: 1rem;
    }

    & a {
        font-family: 'Inter', sans-serif;
        color: ${({theme}) => theme.primary1};
    }

    & a:hover {
        text-decoration: underline;
    }

    & li {
        padding-left: 0.5rem;
        margin: 0 0 0.5rem;
    }

    & li::marker {
        content: '→';
        color: ${({theme}) => theme.primary1};
    }

    & .anchor {
        position: absolute;
        top: 0;
        left: 0;
        transition: opacity 250ms ease 0s;
        transform: translateX(-150%);
        opacity: 0;
    }

    & .anchor svg {
        fill: ${({theme}) => theme.text1};
        width: 1.5rem;
        height: 1.5rem;
    }

    & h1:hover .anchor, & h2:hover .anchor, & h3:hover .anchor {
        opacity: 1;
    }

    ${({theme}) => theme.media.medium`
        margin-top: 3rem;
        max-width: none;
    `}

    ${({theme}) => theme.media.small`
        & .anchor {
            display: none;
        }
    `}

    ${({theme}) => theme.media.extraSmall`
        & h1 {
            font-size: 1.5rem;
        }

        & h2 {
            font-size: 1.25rem;
        }

        & h3 {
            font-size: 1rem;
        }
    `}
`

export default function BlogPost({data, pageContext, location}) {
    return (
        <>
            <Seo
                title={pageContext.title}
                path={location.pathname}
            />
            <BannerSection>
                <Banner fluid={data.mdx.frontmatter.banner.childImageSharp.fluid} />
            </BannerSection>
            <BlogContentSection>
                <DateField>{data.mdx.frontmatter.date}</DateField>
                <Title>{data.mdx.frontmatter.title}</Title>
                <BlogBody>
                    <MDXRenderer>{data.mdx.body}</MDXRenderer>
                </BlogBody>
            </BlogContentSection>
        </>
    )
}

export const query = graphql`
    query BlogPostQuery($relativePath: String) {
        mdx(fields: { relativePath: { eq: $relativePath } }) {
            frontmatter {
                title
                date
                banner {
                    childImageSharp {
                        fluid(quality: 100, maxWidth: 1024) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            fields {
                slug
            }
            body
        }
    }
`
