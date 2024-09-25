import styled from "styled-components";

export const TransactionContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;
`

export const TransactionTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    td {
        padding: 1.25rem 2rem;
        background: ${props => props.theme['gray-700']};
        align-items: center;

        &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }

        button {
            background: transparent;
            outline: none;
            line-height: 0;
            cursor: pointer;
            border: 0;

            svg {
                color: ${props => props.theme['white']};
            }   

            &:hover {
                color: ${props => props.theme['red-500']};
            }
        }
    }
`

interface PriceHighLightProps {
    $variant: 'income' | 'outcome'
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
    color: ${props => props.$variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};
`

export const DeleteTransaction = styled.button`
    height: 50px;
    border: 0;
    background: ${props => props.theme['green-500']};
    color: ${props => props.theme['white']};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background: ${props => props.theme['red-500']};
        transition: background-color 0.2s;
    }
`

export const NewEditTransactionButton = styled.button`
    height: 50px;
    border: 0;
    background: ${props => props.theme['green-500']};
    color: ${props => props.theme['white']};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background: ${props => props.theme['green-500']};
        transition: background-color 0.2s;
    }
`