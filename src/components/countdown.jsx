import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useIntl } from 'gatsby-plugin-intl'

import { translateMessageId } from '../utils/translations'

const ComingSoon = styled.h1`
    width: 100%;
    text-align: center;
    margin: 0 0 2rem;

    ${({theme}) => theme.media.small`
        font-size: 3rem;
        line-height: 4rem;
    `}
`

const StyledCountdown = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 1rem 2rem;

    ${({theme}) => theme.media.extraSmall`
        padding: 0 1rem;
        grid-template-columns: repeat(2, 1fr);
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
        font-size: 4rem;
        font-family: 'Roboto Mono', monospace;
        font-weight: 600;
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

const Countdown = ({date, onLaunch}) => {
    const calculateTimeLeft = () => {
        let difference = +date - +new Date()

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            }
        } else {
            return null
        }
    }

    const intl = useIntl()
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
        // exit early when we reach 0
        if (!timeLeft) return;

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft]);

    if (!timeLeft) {
      onLaunch()
      return null
    }

    return (
        <>
            <ComingSoon>{translateMessageId('coming-soon', intl)}</ComingSoon>
            <StyledCountdown>
                <NumberWrapper>
                    <h2>{timeLeft?.days ?? 0}</h2>
                    <p>{translateMessageId('days', intl)}</p>
                </NumberWrapper>
                <NumberWrapper>
                    <h2>{timeLeft?.hours ?? 0}</h2>
                    <p>{translateMessageId('hours', intl)}</p>
                </NumberWrapper>
                <NumberWrapper>
                    <h2>{timeLeft?.minutes ?? 0}</h2>
                    <p>{translateMessageId('minutes', intl)}</p>
                </NumberWrapper>
                <NumberWrapper>
                    <h2>{timeLeft?.seconds ?? 0}</h2>
                    <p>{translateMessageId('seconds', intl)}</p>
                </NumberWrapper>
            </StyledCountdown>
        </>
    );
}

export default Countdown
