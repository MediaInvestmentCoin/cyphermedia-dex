import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useIntl } from 'gatsby-plugin-intl'
import { translateMessageId } from '../utils/translations'

const StyledTokenData = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 1rem 2rem;

    ${({theme}) => theme.media.small`
        padding: 0 1rem;
    `}
`

const NumberWrapper = styled.div`
    flex-basis: auto;
    flex-grow: 1;

    & > h2, & > p {
        text-align: center
    }

    & > h2 {
        margin: 0 0 0.25rem;
        line-height: 4rem;
    }

    & > p {
        margin: 0;
        color: ${({theme}) => theme.text2};
    }

    ${({theme}) => theme.media.small`
        & > h2 {
            font-size: 2rem;
        }

        & > p {
            font-size: 1rem;
        }
    `}
`

const TokenData = () => {
    const intl = useIntl()
    const [stats, setStats] = useState({})

    useEffect(() => {
        fetch('https://g4hh19ery9.execute-api.eu-west-1.amazonaws.com/default/get_stats?name=lambodoge')
            .then(res => res.json())
            .then((data) => {
                setStats(data)
            })
            .catch(console.log)
    }, [])

    const formatter = new Intl.NumberFormat("en", {
        style: "decimal",
        useGrouping: true,
    });

    const data = [
        {
            name: translateMessageId('mcap', intl),
            value: `$${formatter.format(stats.mcap || 0)}`
        }, {
            name: translateMessageId('holders', intl),
            value: formatter.format(stats.holders || 0)
        }, {
            name: translateMessageId('liquidity', intl),
            value: `$${formatter.format(stats.liquidity || 0)}`
        }
    ]

    return (
        <StyledTokenData>
            {data.map((stat, index) =>
                <NumberWrapper
                    key={index}
                >
                    <h2>{stat.value}</h2>
                    <p>{stat.name}</p>
                </NumberWrapper>
            )}
        </StyledTokenData>
    )
}

export default TokenData
