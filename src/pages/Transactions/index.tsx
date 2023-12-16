import React, { useState } from 'react'

import { BottomNavigation } from '../../shared/components/BottomNavigation'
import { Icon } from '../../shared/components/Icon'
import { AuthPage } from '../../shared/middleware/AuthPage'

import * as Styled from './styles'

type DirectionType = 'income' | 'outcome'

const Transactions = (): React.ReactElement => {
  const [direction, setDirection] = useState<DirectionType>('income')

  return (
    <Styled.MainContainer>
      <BottomNavigation current="transactions" />

      <Styled.Title>Transactions</Styled.Title>
      <Styled.FilterContainer>
        <Styled.MonthSelector type="button">
          March <Icon name="caretDown" />
        </Styled.MonthSelector>
        <Styled.DirectionContainer>
          <Styled.DirectionItem onClick={() => { setDirection('income') }} type="button" side="left" active={direction === 'income'}>
            Incomes
          </Styled.DirectionItem>
          <Styled.DirectionItem onClick={() => { setDirection('outcome') }} type="button" side="right" active={direction === 'outcome'}>
            Outcomes
          </Styled.DirectionItem>
        </Styled.DirectionContainer>
      </Styled.FilterContainer>

      <Styled.BodyContent>
        <Styled.ResumeContainer>
          <Styled.ResumeItem>
            <Styled.ResumeLabel>
              Total
            </Styled.ResumeLabel>
            <Styled.ResumeValue>
              1250 USD
            </Styled.ResumeValue>
          </Styled.ResumeItem>
          <Styled.ResumeItem>
            <Styled.ResumeLabel>Pending</Styled.ResumeLabel>
            <Styled.ResumeValue>1417 USD</Styled.ResumeValue>
          </Styled.ResumeItem>
        </Styled.ResumeContainer>

        <Styled.TransactionsListTitle>
          Last transactions
        </Styled.TransactionsListTitle>

        <Styled.TransactionsList>
          <Styled.TransactionItem>
            <Styled.TransactionColumn>
              <Styled.TransactionTitle>Gamepass</Styled.TransactionTitle>
              <Styled.TransactionUpdated>Two days ago</Styled.TransactionUpdated>
            </Styled.TransactionColumn>

            <Styled.TransactionColumn>
              <Styled.TransactionValue>104 USD</Styled.TransactionValue>
              <Styled.TransactionStatus>PAID</Styled.TransactionStatus>
            </Styled.TransactionColumn>
          </Styled.TransactionItem>
        </Styled.TransactionsList>
      </Styled.BodyContent>
    </Styled.MainContainer>
  )
}

export const TransactionsPage = AuthPage(Transactions)
