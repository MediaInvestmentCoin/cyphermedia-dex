import React from 'react'
import { IntlProvider, IntlContextProvider } from 'gatsby-plugin-intl'

import Header from '../components/header'
import Footer from '../components/footer'
import { RadialCard } from '../components/utils'
import Mdx from '../components/mdx'

import '../styles/layout.css'
import '../styles/fonts.css'

const Layout = ({children, pageContext}) => {
    const intl = pageContext.intl

    return (
        <IntlProvider
            locale={intl.language}
            defaultLocale={intl.defaultLanguage}
            messages={intl.messages}
        >
            <IntlContextProvider value={intl} >
                <RadialCard/>
                <Header pageContext={pageContext} />
                <Mdx>{children}</Mdx>
                <Footer/>
            </IntlContextProvider>
        </IntlProvider>
    )
}

export default Layout
