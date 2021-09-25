import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'

import Seo from '../components/seo'
import TeamCard from '../components/cards/team'
import { SmallSection, SectionTitle } from '../components/section'
import { translateMessageId } from '../utils/translations'

import teamMetadata from '../data/team.json'

const TeamGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    gap: 4rem;

    ${({theme}) => theme.media.medium`
        grid-template-columns: repeat(2, 1fr);
    `}

    ${({theme}) => theme.media.small`
        grid-template-columns: repeat(1, 1fr);
    `}
`

export default function Team() {
    const data = useStaticQuery(graphql`
        {
            avatar1: file(relativePath: { eq: "mask-01.png" }) {
                childImageSharp {
                    fluid(quality: 100, maxWidth: 512) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            avatar2: file(relativePath: { eq: "mask-02.png" }) {
                childImageSharp {
                    fluid(quality: 100, maxWidth: 512) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            avatar3: file(relativePath: { eq: "mask-03.png" }) {
                childImageSharp {
                    fluid(quality: 100, maxWidth: 512) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            avatar4: file(relativePath: { eq: "mask-04.png" }) {
                childImageSharp {
                    fluid(quality: 100, maxWidth: 512) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    const intl = useIntl()

    return (
        <>
            <Seo
                title="Team"
            />
            <SmallSection>
                <SectionTitle>{translateMessageId('team', intl)}</SectionTitle>
                <TeamGrid>
                    {
                        teamMetadata.map((teamMember, index) =>
                            <TeamCard
                                key={`team-card-${index}`}
                                data={{
                                    ...teamMember,
                                    avatar: data[`avatar${index + 1}`]
                                }}
                            />
                        )
                    }
                </TeamGrid>
            </SmallSection>
        </>
    )
}
