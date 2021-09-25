import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'

export interface Colors {
    white: string,
    black: string,

    primary1: string,
    primary2: string,

    bg1: string,
    bg2: string,

    text1: string,
    text2: string,

    green: string,
    red: string
}

declare module 'styled-components' {
    export interface DefaultTheme extends Colors {
        media: {
            extraSmall: ThemedCssFunction<DefaultTheme>,
            small: ThemedCssFunction<DefaultTheme>,
            medium: ThemedCssFunction<DefaultTheme>,
            large: ThemedCssFunction<DefaultTheme>
            minMedium: ThemedCssFunction<DefaultTheme>,
        }
    }
}
