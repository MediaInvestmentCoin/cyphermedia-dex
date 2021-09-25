import React from 'react'
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, lang, title, path }) {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    siteUrl
                    title
                    description
                    author
                }
            }
        }
    `)

    const metaDescription = description || site.siteMetadata.description
    const defaultTitle = site.siteMetadata?.title
    const lamboTitle = 'LamboDoge'

    return (
        <Helmet
            htmlAttributes={{lang}}
            title={title}
            titleTemplate={defaultTitle ? `${defaultTitle} | %s` : null}
            meta={[
                {
                    name: `description`,
                    content: metaDescription
                }, {
                    property: `og:title`,
                    content: lamboTitle
                }, {
                    property: `og:description`,
                    content: metaDescription
                }, {
                    property: `og:type`,
                    content: `website`
                }, {
                    name: `twitter:card`,
                    content: `summary_large_image`
                }, {
                    name: `twitter:creator`,
                    content: site.siteMetadata?.author || ``
                }, {
                    name: `twitter:title`,
                    content: lamboTitle
                }, {
                    name: `twitter:description`,
                    content: metaDescription
                }, {
                    name: `og:image`,
                    content: `${site.siteMetadata.siteUrl}${path ? path : '/images/'}twitter-card.jpg`,
                },
            ]}
        />
    )
}

Seo.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
}

export default Seo
