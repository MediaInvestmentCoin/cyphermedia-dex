import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
    max-width: 1312px;
    margin: 100px auto 0;
    padding: 0 4rem;

    ${({theme}) => theme.media.small`
        padding: 0 1rem;
        margin-top: 4rem;
    `}
`

export default Section

export const SmallSection = styled(Section)`
    max-width: 1024px !important;

    ${({theme}) => theme.media.large`
        margin-top: 4rem;
    `}

    ${({theme}) => theme.media.extraSmall`
        margin-top: 2rem;
    `}
`

const StyledSectionTitle = styled.div`
    margin-bottom: 64px;

    & > h2 {
        font-weight: 800;
        margin: 0;
    }

    & > h2 > span {
        font-weight: 300;
    }

    & > a {
        font-family: Inter;
        font-size: 20px;
        font-weight: 500;
    }

    & > a:hover {
        text-decoration: underline;
    }

    ${({theme}) => theme.media.extraSmall`
        & > h2 {
            font-size: 2.5rem;
            line-height: 2.75rem;
            margin-bottom: 12px
        }

        & > a {
            font-size: 16px;
        }
    `}
`

export const SectionTitle = ({children, link = undefined, linkName = undefined}) => {
    return (
        <StyledSectionTitle>
            <h2>
                <span>LAMBODOGE</span>
                {' '}
                {children.toUpperCase()}
            </h2>
            {link && linkName &&
                <a
                    href={link}
                    target='_blank'
                    rel='noreferrer'
                >
                    {linkName.toUpperCase()} →
                </a>
            }
        </StyledSectionTitle>
    )
}
