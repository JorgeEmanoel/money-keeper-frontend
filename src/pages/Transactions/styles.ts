import styled, { css } from 'styled-components'
import { TRANSACTION_STATUS, type TStatus } from '../../infra/shared/types/Transactions'

export const MainContainer = styled.div`
  margin: 0;
  background: #eeeee;
  padding: 32px 16px;
  padding-bottom: 80px;
`

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
`

export const FilterContainer = styled.div`
  padding: 16px 0;
  text-align: center;
`

export const MonthSelector = styled.button`
  background: #fff;
  font-size: 16px;
  border: none;
  font-weight: bold;
  padding: 16px;
`

export const DirectionContainer = styled.div`
  width: 100%;
`

interface ButtonProps {
  active: boolean
  side: 'left' | 'right'
}
export const DirectionItem = styled.button<ButtonProps>`
  background: #c0c0c0;
  border-radius: 24px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 24px;
  position: relative;
  transition: background .3s;
  width: 50%;
  z-index: 2;

  ${({ active, side }) => active
    ? css`
      background: linear-gradient(170deg, rgba(79,2,145,1) 32%, rgba(98,22,173,1) 56%, rgba(166,108,249,1) 100%);
      color: white;
      cursor: normal;
    `
    : css`
      border-radius: ${() => side === 'left' ? '24px 0 0 24px' : '0 24px 24px 0'};
      padding: ${() => side === 'left' ? '24px 32px 24px 24px !important' : '24px 24px 24px 32px !important'};
      margin: ${() => side === 'left' ? '0 -16px 0 0' : '0 0 0 -16px'};
      z-index: 1;

      &:hover {
        box-shadow: 0 0 40px #fff inset;
      }
    `
}
`

export const BodyContent = styled.div`
  padding: 20px;
  padding-top: 0;
`

export const ResumeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 0;
`

export const ResumeItem = styled.div`
  display: flex;
  flex-direction: column;
`

export const ResumeLabel = styled.span`
  font-size: 16px;
  color: #333;
  padding: 8px 0;
`

export const ResumeValue = styled.span`
  font-size: 24px;
  font-weight: bold;
`

export const TransactionsListTitle = styled.h4``

export const TransactionsList = styled.div``

interface TransactionItemProps {
  status: TStatus
}
export const TransactionItem = styled.button<TransactionItemProps>`
  background: #333;
  border-radius: 16px;
  border: none;
  box-shadow: 4px 4px 8px #666;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  text-align: left;
  justify-content: space-between;
  margin: 8px 0;
  padding: 16px;
  width: 100%;
  position: relative;

  ${({ status }) => status === TRANSACTION_STATUS.CANCELED
    ? css`
    background: #eee;
    color: #333;
    `
    : ''}

  ${({ status }) => status === TRANSACTION_STATUS.PAID
    ? css`
    background: #fff;
    border-left: 5px solid rgba(98,22,173,1); 
    `
    : ''}
`

export const TransactionColumn = styled.div``

interface TransactionTitleProps {
  status: TStatus
}
export const TransactionTitle = styled.div<TransactionTitleProps>`
  font-weight: bold;
  font-size: 18px;

  ${({ status }) => status === TRANSACTION_STATUS.CANCELED
    ? css`
    color: #c0c0c0;
    text-decoration: line-through;
    `
    : ''}

  ${({ status }) => status === TRANSACTION_STATUS.PAID
    ? css`
    color: #666;
    `
    : ''}
`

interface TransactionValueProps {
  status: TStatus
}
export const TransactionValue = styled.div<TransactionValueProps>`
  font-weight: bold;
  font-size: 18px;

  ${({ status }) => status === TRANSACTION_STATUS.CANCELED
    ? css`
    color: #c0c0c0;
    text-decoration: line-through;
    `
    : ''}

  ${({ status }) => status === TRANSACTION_STATUS.PAID
    ? css`
    color: #666;
    `
    : ''}
`

interface TransactionStatusProps {
  status: TStatus
}
export const TransactionStatus = styled.div<TransactionStatusProps>`
  text-align: right;
  font-size: 12px;
  color: #c0c0c0;

  ${({ status }) => status === TRANSACTION_STATUS.PAID
    ? css`
    color: rgba(98,22,173,1);
    font-weight: bold;
    `
    : ''}
`

export const TransactionUpdated = styled.div`
  font-size: 12px;
  text-align: left;
  color: #c0c0c0;
`

export const UpdateTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const UpdateTransactionButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-around;
`

export const PaidButton = styled.button`
  background: green;
  border-radius: 8px;
  border: 0;
  box-shadow: 0 0 10px #fff;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  margin-top: 32px;
  padding: 16px;
  transition: all .3s;

  &:hover {
    background: #fee;
    box-shadow: 0 0 2px #c0c0c0;
  }
`

export const CanceledButton = styled.button`
  background: red;
  border-radius: 8px;
  border: 0;
  box-shadow: 0 0 10px #fff;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  margin-top: 32px;
  padding: 16px;
  transition: all .3s;

  &:hover {
    background: #fee;
    box-shadow: 0 0 2px #c0c0c0;
  }
`
