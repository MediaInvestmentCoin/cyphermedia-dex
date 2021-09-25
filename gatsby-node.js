const fs = require("fs")
const { createFilePath } = require(`gatsby-source-filesystem`)
const gatsbyConfig = require(`./gatsby-config.js`)

const defaultLanguage = gatsbyConfig.siteMetadata.defaultLanguage
const supportedLanguages = gatsbyConfig.siteMetadata.supportedLanguages

// same function from 'gatsby-plugin-intl'
const flattenMessages = (nestedMessages, prefix = "") => {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key]
        let prefixedKey = prefix ? `${prefix}.${key}` : key

        if (typeof value === "string") {
            messages[prefixedKey] = value
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey))
        }

        return messages
    }, {})
}

// same function from 'gatsby-plugin-intl'
const getMessages = (path, language) => {
    try {
        const messages = require(`${path}/${language}.json`)

        return flattenMessages(messages)
    } catch (error) {
        if (error.code === "MODULE_NOT_FOUND") {
            process.env.NODE_ENV !== "test" &&
            console.error(
                `[gatsby-plugin-intl] couldn't find file "${path}/${language}.json"`
            )
        }

        throw error
    }
}

exports.onCreateNode = function({ node, actions, getNode }) {
    if (node.internal.type === `Mdx`) {
        let slug = createFilePath({ node, getNode, basePath: 'content' })

        if (slug.includes('/translations/')) {
            slug = slug.replace('/translations', '')
        } else {
            slug = `/${defaultLanguage}${slug}`
        }

        console.log(`${slug.replace(/\d+-/g, ``)}`)

        if (slug) {
            actions.createNodeField({
                name: 'slug',
                node,
                value: `${slug.replace(/\d+-/g, ``)}`
            })
        }

        const absolutePath = node.fileAbsolutePath
        const relativePathStart = absolutePath.indexOf("src/")
        const relativePath = absolutePath.substring(relativePathStart)

        if (relativePath) {
            actions.createNodeField({
                name: 'relativePath',
                node,
                value: relativePath
            })
        }
    }
}

exports.createPages = async ({ graphql, reporter, actions }) => {
    const { createPage } = actions

    const result = await graphql(`
        query {
            allMdx {
                edges {
                    node {
                        frontmatter {
                            title
                            lang
                        }
                        fields {
                            relativePath
                            slug
                        }
                    }
                }
            }
        }
    `)

    if (result.errors) {
        reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query')
    }

    result.data.allMdx.edges.forEach(({ node }) => {
        const language = node.frontmatter.lang
        const slug = node.fields.slug
        const relativePath = node.fields.relativePath

        if (language === defaultLanguage) {
            for (const lang of supportedLanguages) {
                const splitPath = relativePath.split("/")
                splitPath.splice(2, 0, `translations/${lang}`)
                const langPath = splitPath.join("/")

                if (!fs.existsSync(langPath)) {
                    const splitSlug = slug.split("/")
                    splitSlug.splice(1, 1, lang)
                    const langSlug = splitSlug.join("/")


                    createPage({
                        path: langSlug,
                        component: require.resolve(`./src/templates/blogPost.jsx`),
                        context: {
                            relativePath: node.fields.relativePath,
                            title: node.frontmatter.title,
                            intl: {
                                language: lang,
                                defaultLanguage,
                                languages: supportedLanguages,
                                messages: getMessages("./src/intl/", lang),
                                routed: true,
                                originalPath: slug.replace(`/${lang}`, ''),
                                redirect: false,
                            }
                        }
                    })
                }
            }
        }

        createPage({
            path: slug,
            component: require.resolve(`./src/templates/blogPost.jsx`),
            context: {
                relativePath: node.fields.relativePath,
                title: node.frontmatter.title,
                intl: {
                    language: language,
                    defaultLanguage,
                    languages: supportedLanguages,
                    messages: getMessages("./src/intl/", language),
                    routed: true,
                    originalPath: slug.replace(new RegExp(`^/${language}`, 'g'), ''),
                    redirect: false,
                }
            }
        })
    })


}
