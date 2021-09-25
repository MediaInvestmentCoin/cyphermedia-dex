import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import { useIntl } from 'gatsby-plugin-intl'

import { RowCentered } from '../flexbox'
import { translateMessageId } from '../../utils/translations'

import TwitterIcon from '../../images/twitter.inline.svg'
import TelegramIcon from '../../images/telegram.inline.svg'

const StyledTeamCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 256px;
`

const Avatar = styled(Image)`
    width: 100%
`

const MemberName = styled.h4`
    text-align: center;
    font-weight: 500;
    font-size: 24px;
    margin: 0;
`

const MemberTitle = styled.p`
    color: ${({theme}) => theme.text2};
    text-align: center;
    font-size: 16px;
    margin: 8px 0 0;
`

const SocialLinksWrapper = styled(RowCentered)`
    gap: 1.5rem;
    margin: 1.5rem auto 0;

    & svg {
        width: 1.5rem;
        fill: ${({theme}) => theme.text1};
    }
`

const TeamCard = ({data}) => {
    const intl = useIntl()

    return (
        <StyledTeamCard>
            <Avatar fluid={data.avatar.childImageSharp.fluid} />
            <MemberName>{data.name}</MemberName>
            <MemberTitle>{translateMessageId(data.title, intl)}</MemberTitle>
            <SocialLinksWrapper>
                {data.twitterUsername &&
                    <a
                        href={`https://twitter.com/${data.twitterUsername}`}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <TwitterIcon/>
                    </a>
                }
                {data.telegramUsername &&
                    <a
                        href={`https://t.me/${data.telegramUsername}`}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <TelegramIcon/>
                    </a>
                }
            </SocialLinksWrapper>
        </StyledTeamCard>
    )
}

export default TeamCard
