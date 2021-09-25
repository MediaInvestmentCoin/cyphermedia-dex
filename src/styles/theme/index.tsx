import React, { useMemo } from 'react'
import {
    ThemeProvider,
    createGlobalStyle,
    css
} from 'styled-components'

import { Colors } from './styled'

const MEDIA_QUERIES_WIDTH = {
    extraSmall: 'max-width: 481',
    small: 'max-width: 769',
    medium: 'max-width: 1024',
    large: 'max-width: 1200',
    minMedium: 'min-width: 1025',
}

const mediaWidth: { [breakpoint in keyof typeof MEDIA_QUERIES_WIDTH]: typeof css } =
    Object.keys(MEDIA_QUERIES_WIDTH).reduce((acc, breakpoint) => {
        acc[breakpoint] = (first: any, ...interpolations: any[]) => css`
            @media only screen and (${MEDIA_QUERIES_WIDTH[breakpoint]}px) {
                ${css(first, ...interpolations)}
            }
        `;
        return acc
    }, {}) as any

export function colors(darkMode: boolean): Colors {
    return {
        white: '#ffffff',
        black: '#000000',

        primary1: '#EF0044',
        primary2: '#4518F9',

        bg1: '#11131E',
        bg2: '#00000080',

        text1: '#F7F7F7',
        text2: '#8E8DA4',

        green: '#00E175',
        red: '#EF0044'
    }
}

function theme(darkMode: boolean) {
    return {
        ...colors(darkMode),

        media: mediaWidth
    }
}

const ThemedGlobalStyle = createGlobalStyle`
    body {
        background-color: ${({theme}) => theme.bg1};
    }

    h1, h2, h3, h4, h5, h6, p, a, ul, ol {
        color: ${({theme}) => theme.text1};
    }

    code {
        background: ${({theme}) => theme.text2}40;
        padding: 0 0.25rem;
        border-radius: 0.25rem;
        font-size: 16px;
    }
`

export default function StyledThemeProvider({children}) {
    const darkMode = false
    const themeObject = useMemo(() => theme(darkMode), [darkMode])

    return (
        <ThemeProvider theme={themeObject} >
            <ThemedGlobalStyle />
            {children}
        </ThemeProvider>
    )
}
