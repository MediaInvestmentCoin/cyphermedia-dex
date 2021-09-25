const menu = require("./src/data/menu.json")
const translations = require("./src/utils/translations")
require("dotenv").config();

const supportedLanguages = translations.supportedLanguages
const defaultLanguage = `en`

module.exports = {
    siteMetadata: {
        title: `LamboDoge`,
        description: `The new generation of automatic yield tokens`,
        author: `@LamboDoge`,
        menulinks: menu,
        siteUrl: `https://lambodoge.org`,
        defaultLanguage,
        supportedLanguages
    },
    plugins: [
        // i18n support
        {
            resolve: `gatsby-plugin-intl`,
            options: {
                // language JSON resource path
                path: `${__dirname}/src/intl`,
                // supported language
                languages: supportedLanguages,
                // language file path
                defaultLanguage,
                // redirect to `/${lang}/` when connecting to `/`
                // based on user's browser language preference
                redirect: true,
            },
        }, {
            resolve: `gatsby-plugin-s3`,
            options: {
                generateRoutingRules: false,
                bucketName: process.env.AWS_S3_BUCKET || 'NOT_SPECIFIED',
                protocol: 'https',
                hostname: 'lambodoge.org',
                acl: null
            }
        },
        `gatsby-plugin-react-helmet`,
        "gatsby-plugin-styled-components",
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        `gatsby-background-image`,
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                gatsbyRemarkPlugins: [
                    `gatsby-remark-autolink-headers`,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                        },
                    }, {
                        resolve: `gatsby-remark-twitter-cards`,
                        options: {
                            title: 'LamboDoge', // website title
                            separator: '|', // default
                            author: '@LamboDoge',
                            background: require.resolve('./static/images/twitter-card-bg.png'), // path to 1200x630px file or hex code, defaults to black (#000000)
                            fontColor: '#F7F7F7', // defaults to white (#ffffff)
                            fontStyle: 'sans-serif', // default
                            titleFontSize: 124, // default
                            fontFile: require.resolve('./static/fonts/Poppins-Medium.ttf') // will override fontStyle - path to custom TTF font
                        }
                    },
                ],
                plugins: [ { resolve: `gatsby-remark-images` } ],
            },
        }, {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        }, {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: `${__dirname}/src/content`,
            },
        }, {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /\.inline\.svg$/
                }
            }
        }, {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `LamboDoge Website`,
                short_name: `lamboDoge`,
                start_url: `/`,
                background_color: `#EF0044`,
                theme_color: `#EF0044`,
                display: `minimal-ui`,
                icon: `src/images/lambodoge-icon.png`
            },
        },
    ],
};
