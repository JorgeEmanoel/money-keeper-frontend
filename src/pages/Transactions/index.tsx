import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'

import { BottomNavigation } from '../../shared/components/BottomNavigation'
// import { Icon } from '../../shared/components/Icon'
import { AuthPage } from '../../shared/middleware/AuthPage'

import * as Styled from './styles'
import { type TTransaction } from '../../infra/shared/types/Transactions'
import { Transaction } from '../../infra/services/Transaction'

type DirectionType = 'income' | 'outcome'

interface TransactionsState {
  items: TTransaction[]
  totalPending: number
  total: number
  loading: boolean
}

const Transactions = (): React.ReactElement => {
  const [direction, setDirection] = useState<DirectionType>('income')
  const [transactionsState, setTransactionsState] = useState<TransactionsState>({
    items: [],
    loading: true,
    total: 0,
    totalPending: 0
  })
  const fetchTransactions = async (): Promise<void> => {
    setTransactionsState(before => ({ ...before, loading: true }))
    let items: TTransaction[] = []
    let total = 0
    let totalPending = 0

    const fetchMapping = {
      income: Transaction.incoming,
      outcome: Transaction.outcoming
    }

    const result = await fetchMapping[direction](format(new Date(), 'yyyy-MM'))

    if (result.ok) {
      items = result.transactions
      total = result.total
      totalPending = result.totalPending
    }

    setTransactionsState({
      loading: false,
      items,
      total,
      totalPending
    })
  }

  useEffect(() => {
    fetchTransactions().catch(console.error)
  }, [direction])

  return (
    <Styled.MainContainer>
      <BottomNavigation current="transactions" />

      <Styled.Title>Transactions</Styled.Title>
      <Styled.FilterContainer>
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
              {transactionsState.total.toLocaleString()} BRL
            </Styled.ResumeValue>
          </Styled.ResumeItem>
          <Styled.ResumeItem>
            <Styled.ResumeLabel>Pending</Styled.ResumeLabel>
            <Styled.ResumeValue>
              {transactionsState.totalPending.toLocaleString()} BRL
            </Styled.ResumeValue>
          </Styled.ResumeItem>
        </Styled.ResumeContainer>

        <Styled.TransactionsListTitle>
          Last transactions
        </Styled.TransactionsListTitle>

        <Styled.TransactionsList>
          {transactionsState.items.map(item => (
            <Styled.TransactionItem key={`transactions-${item.id}`}>
              <Styled.TransactionColumn>
                <Styled.TransactionTitle>{item.name}</Styled.TransactionTitle>
                <Styled.TransactionUpdated>{item.description}</Styled.TransactionUpdated>
              </Styled.TransactionColumn>

              <Styled.TransactionColumn>
                <Styled.TransactionValue>{item.value.toLocaleString()} BRL</Styled.TransactionValue>
                <Styled.TransactionStatus>{item.status.toUpperCase()}</Styled.TransactionStatus>
              </Styled.TransactionColumn>
            </Styled.TransactionItem>
          ))}
        </Styled.TransactionsList>
      </Styled.BodyContent>
    </Styled.MainContainer>
  )
}

export const TransactionsPage = AuthPage(Transactions)
