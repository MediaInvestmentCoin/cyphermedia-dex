import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Slider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { useIntl } from 'gatsby-plugin-intl'

import { translateMessageId } from '../../utils/translations'

import { RowCentered, Column } from '../flexbox'

const Title = styled.p``

const Tax = styled.h1``

const Percentage = styled.p``

const Subtitle = styled.p``

const ActionButton = styled.button`
    opacity: ${({active}) => active ? 1 : 0.3};
    ${({active}) => !active && `
        &:hover {
            opacity: 0.8;
        }
    `}
`

const BuyButton = styled(ActionButton)`
    color: ${({theme}) => theme.green};
`

const SellButton = styled(ActionButton)`
    color: ${({theme}) => theme.red};
`

const Wrapper = styled.div`
    display: grid;
    row-gap: 24px;
    grid-row-gap: 24px;
    grid-template: auto / 250px auto;
    border-radius: 8px;
    border: 1px solid ${({theme}) => theme.text1};
    padding: 1rem 2rem;
    margin: 2rem 0;
    background: ${({theme}) => theme.bg2};

    ${({theme}) => theme.media.small`
        padding: 1rem 1.5rem;
        grid-template: auto / auto;
        grid-gap: 2rem;
    `}

    & ${Tax} {
        font-weight: 600;
        font-size: 64px;
        color: ${({theme}) => theme.primary2};
        margin: 8px 0 0;
    }

    & ${Title} {
        font-size: 20px;
        font-weight: 500;
        margin: 0;
    }

    & ${Subtitle} {
        margin: 0;
    }

    & ${Percentage} {
        font-size: 28px;
        margin: 8px 0 0;
        font-weight: 600;
        line-height: 28px;
    }

    & ${ActionButton} {
        font-size: 24px;
        margin: 8px 0 0;
        font-weight: 600;
        padding: 0;
        background: transparent;
        border: none;
        cursor: pointer;
    }
`

const SliderWrapper = styled.div`
    padding: 0 1rem 20px;
`

const StyledSlider = withStyles({
    root: {
        color: '#EF0044',
        height: 8,
    },
    thumb: {
        height: '1rem',
        width: '1rem',
        '&:focus, &:hover': {
            boxShadow: 'inherit',
        },
    },
    rail: {
        height: 4,
        borderRadius: 8
    },
    track: {
        height: 4,
        borderRadius: 8
    }
})(Slider)

const StyledTooltip = withStyles({
    tooltip: {
        background: "#8E8DA480",
        fontSize: "16px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        textAlign: 'center',
        ['@media (min-width:780px)']: { // eslint-disable-line no-useless-computed-key
            minWidth: 50,
        }
    },
    tooltipPlacementBottom: {
        margin: "6px 0 0",
    },
})(Tooltip);

function ValueLabelComponent({ children, open, value }) {
    return (
        <StyledTooltip open={open} enterTouchDelay={0} placement="bottom" title={value}>
            {children}
        </StyledTooltip>
    );
}

const Action = {
    Buy: "Buy",
    Sell: "Sell"
}

const TaxSimulator = () => {
    const intl = useIntl()

    const [selectedAction, setSelectedAction] = useState(Action.Buy)
    const [priceImpact, setPriceImpact] = useState(0)

    const handlePriceImpactChange = (event, newValue) => {
        setPriceImpact(newValue)
    }

    const formatPriceImpact = (value) => {
        return `${value}%`
    }

    const tax = useMemo(() => {
        const data = {
            [Action.Buy]: {
                0: {holders: 1, liquidity: 1, marketing: 2},
                3: {holders: 2, liquidity: 2, marketing: 4},
                5: {holders: 4, liquidity: 2, marketing: 4},
                8: {holders: 4, liquidity: 4, marketing: 6},
                11: {holders: 5, liquidity: 5, marketing: 8}
            },
            [Action.Sell]: {
                0: {holders: 1, liquidity: 1, marketing: 2},
                2: {holders: 2, liquidity: 2, marketing: 4},
                3: {holders: 4, liquidity: 2, marketing: 4},
                5: {holders: 8, liquidity: 4, marketing: 4},
                8: {holders: 10, liquidity: 4, marketing: 6},
            }
        }
        let tax
        let minKey = -1

        for (const key of Object.keys(data[selectedAction])) {
            if (+key > minKey && priceImpact >= key) {
                minKey = +key
                tax = data[selectedAction][key]
            }
        }

        return tax
    }, [selectedAction, priceImpact])

    return (
        <Wrapper>
            <div>
                <Title>{translateMessageId('tax', intl)}</Title>
                <Tax>{(Object.keys(tax)).reduce((acc, cur) => acc + tax[cur], 0)}%</Tax>
            </div>
            <Column>
                 <Title>{translateMessageId('tax-repartition', intl)}</Title>
                <RowCentered justify="space-between" style={{ flexGrow: 1 }} >
                    <div>
                        <Subtitle>{translateMessageId('holders', intl)}</Subtitle>
                        <Percentage>{tax?.holders ?? 0}%</Percentage>
                    </div>
                    <div>
                        <Subtitle>{translateMessageId('liquidity', intl)}</Subtitle>
                        <Percentage>{tax?.liquidity ?? 0}%</Percentage>
                    </div>
                    <div>
                        <Subtitle>{translateMessageId('marketing', intl)}</Subtitle>
                        <Percentage>{tax?.marketing ?? 0}%</Percentage>
                    </div>
                </RowCentered>
            </Column>
            <div>
                <Title>{translateMessageId('select-action', intl)}</Title>
                <RowCentered gap="2rem" >
                    <BuyButton
                        {...(selectedAction === Action.Buy && {active: true})}
                        onClick={() => setSelectedAction(Action.Buy)}
                    >{translateMessageId('buy', intl)}</BuyButton>
                    <SellButton
                        {...(selectedAction === Action.Sell && {active: true})}
                        onClick={() => setSelectedAction(Action.Sell)}
                    >{translateMessageId('sell', intl)}</SellButton>
                </RowCentered>
            </div>
            <div>
                <Title>{translateMessageId('select-price-impact', intl)}</Title>
                <SliderWrapper>
                    <StyledSlider
                        onChange={handlePriceImpactChange}
                        value={priceImpact}
                        ValueLabelComponent={ValueLabelComponent}
                        valueLabelDisplay="on"
                        valueLabelFormat={formatPriceImpact}
                        step={0.1}
                        min={0}
                        max={12}
                    />
                </SliderWrapper>
            </div>
        </Wrapper>
    )
}

export default TaxSimulator
