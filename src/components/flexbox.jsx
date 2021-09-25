import styled from 'styled-components'

export const Row = styled.div`
    display: flex;
    gap: ${({gap}) => gap || 'initial'};
    justify-content: ${({justify}) => justify || 'initial'};
`

export const RowCentered = styled(Row)`
    align-items: center;
`

export const Column = styled(Row)`
    flex-direction: column;
`

export const ColumnCentered = styled(Column)`
    align-items: center;
`
