import React from 'react'
import styled from 'styled-components'

import { RowCentered } from './flexbox'

import TwitterIcon from '../images/twitter.inline.svg'
import TelegramIcon from '../images/telegram.inline.svg'
import RedditIcon from '../images/reddit.inline.svg'

const StyledFooter = styled(RowCentered)`
    width: 100%;
    height: 5.5rem;
    margin-top: 100px;
    gap: 2rem;
    grid-gap: 2rem;
    justify-content: center;

    & svg {
        width: 1.5rem;
        fill: ${({theme}) => theme.text2};
    }

    & svg:hover {
        fill: ${({theme}) => theme.text1};
    }

    ${({theme}) => theme.media.small`
        margin-top: 64px;
    `}
`

const Footer = () => {
    return (
        <StyledFooter>
            <a
                href='https://twitter.com/0xLamboDoge'
                target='_blank'
                rel='noreferrer'
            >
                <TwitterIcon />
            </a>
            <a
                href='https://t.me/LamboDogeEN'
                target='_blank'
                rel='noreferrer'
            >
                <TelegramIcon />
            </a>
            <a
                href='https://reddit.com/r/0xLamboDoge/'
                target='_blank'
                rel='noreferrer'
            >
                <RedditIcon />
            </a>
        </StyledFooter>
    )
}

export default Footer
