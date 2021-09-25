import styled from 'styled-components'

export const RadialCard = styled.div`
    z-index: -1;
    position: fixed;
    background: ${({theme}) => `radial-gradient(circle at top left, ${theme.primary1}4D 0%, ${theme.primary1}00 40%)`};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`
