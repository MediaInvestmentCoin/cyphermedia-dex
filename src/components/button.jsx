import styled from 'styled-components'

const BaseButton = styled.button`
    cursor: pointer;
    padding: 0 1rem;
    height: 35px;
    outline: none;
    background: transparent;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 0.5rem;
`

export const PrimaryButton = styled(BaseButton)`
    color: ${({theme}) => theme.text1};
    background: ${({theme}) => theme.primary1};
`
