import React from 'react'
import { onRenderBody as renderReactHelmet } from 'gatsby-plugin-react-helmet/gatsby-ssr';
import Layout from './src/components/layout'
import StyledThemeProvider from './src/styles/theme'

export const wrapRootElement = ({ element }) => <StyledThemeProvider>{element}</StyledThemeProvider>;

// Prevents <Layout/> from unmounting on page transitions
// https://www.gatsbyjs.com/docs/layout-components/#how-to-prevent-layout-components-from-unmounting
export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>
}

export const onRenderBody = (api, options) => {
    renderReactHelmet(api, options);

    api.setPreBodyComponents([
        <noscript key="noscript">
            Your browser does not support JavaScript!
        </noscript>,
    ])
}
