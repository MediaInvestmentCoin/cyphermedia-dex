import React from 'react'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import { graphql, useStaticQuery } from 'gatsby'

export const Card = styled.div`
    border-radius: 8px;
    border: 1px solid ${({theme}) => theme.text1};
    padding: 1rem 2rem;
`

export const BlurredCard = styled(Card)`
    backdrop-filter: blur(12px);
`

const StyledVoidCard = styled(Card)`
    padding: 0 1rem 1rem 1rem;
`

const VoidBackground = styled(BackgroundImage)`
    height: 240px;
    width: 100%;
    filter: blur(6px);
    background-size: 130%;
    opacity: 0.5 !important;
    z-index: -1;
`

const StyledCard = styled.div`
    margin-top: -240px;
    right: 0;
    left: 0;
    bottom: 0;
    height: fit-content;
`

export const VoidCard = ({children}) => {
    const data = useStaticQuery(graphql`
        {
            lambovoid: file(relativePath: { eq: "lambovoid.png" }) {
                childImageSharp {
                    fluid(quality: 100, maxWidth: 512) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    return (
        <StyledVoidCard>
            <VoidBackground fluid={data.lambovoid.childImageSharp.fluid} />
            <StyledCard>{children}</StyledCard>
        </StyledVoidCard>
    )
}
