import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

import Seo from '../components/seo'
import BlogCard from '../components/cards/blog'
import { SmallSection, SectionTitle } from '../components/section'
import { ColumnCentered } from '../components/flexbox'
import { toAbsoluteSlug } from '../utils/translations'

const BlogCardsWrapper = styled(ColumnCentered)`
    gap: 100px;

    ${({theme}) => theme.media.small`
        gap: 64px;
    `}
`

export default function Blog({pageContext}) {
    const data = useStaticQuery(graphql`
        {
            allMdx(filter: {fileAbsolutePath: {regex: "/blog/"}}, sort: {order: DESC, fields: frontmatter___date}) {
                edges {
                    node {
                        frontmatter {
                            title
                            lang
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
                    }
                }
            }
        }
    `)

    const posts = data.allMdx.edges
    const postsToDisplay = []

    for (const post of posts) {
        if (post.node.frontmatter.lang !== pageContext.intl.defaultLanguage) {
            continue
        }
        const fallbackPost = post
        let foundTranslatedPost = false

        for (const post of posts) {
            if (post.node.frontmatter.lang !== pageContext.intl.language) {
                continue
            }

            if (toAbsoluteSlug(post.node.fields.slug) === toAbsoluteSlug(fallbackPost.node.fields.slug)) {
                postsToDisplay.push(post)
                foundTranslatedPost = true
                break
            }
        }
        if (!foundTranslatedPost) {
            postsToDisplay.push(fallbackPost)
        }
    }

    return (
        <>
            <Seo
                title="Blog"
            />
            <SmallSection>
                <SectionTitle>BLOG</SectionTitle>
                <BlogCardsWrapper>
                    {postsToDisplay.map((post, index) =>
                        <BlogCard
                            key={`blog-post-${index}`}
                            data={post.node} large
                        />
                    )}
                </BlogCardsWrapper>
            </SmallSection>
        </>
    )
}
