import React, { useEffect, useState } from 'react'
import { useLongPress } from 'use-long-press'

import { BottomNavigation } from '../../shared/components/BottomNavigation'
import { AuthPage } from '../../shared/middleware/AuthPage'

import * as Styled from './styles'
import { type TStatus, type TDirection, type TTransaction, TRANSACTION_STATUS } from '../../infra/shared/types/Transactions'
import { Transaction } from '../../infra/services/Transaction'
import { BottomSheet } from '../../shared/components/BottomSheet'
import { Create } from './Forms/Create'
import { FAB } from '../../shared/components/FAB'
import { Period } from '../../infra/services/Period'
import { Icon } from '../../shared/components/Icon'

interface TransactionsState {
  items: TTransaction[]
  totalPending: number
  total: number
  loading: boolean
}

interface UpdatingTransactionState {
  item: TTransaction | null
  updating: boolean
}

const Transactions = (): React.ReactElement => {
  const [direction, setDirection] = useState<TDirection>('income')
  const [transactionsState, setTransactionsState] = useState<TransactionsState>({
    items: [],
    loading: true,
    total: 0,
    totalPending: 0
  })
  const [creating, setCreating] = useState(false)
  const [updatingTransaction, setUpdatingTransaction] = useState<UpdatingTransactionState>({
    item: null,
    updating: false
  })

  const bindTransactionLongPress = useLongPress((_, { context: item }) => {
    // TODO: fix type
    setUpdatingTransaction({
      item: item as TTransaction,
      updating: true
    })
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

    const result = await fetchMapping[direction](Period.current().filterFormat)

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

  const updateStatus = async (id: number, status: TStatus): Promise<void> => {
    const response = await Transaction.changeStatus(id, status)

    if (!response.ok) {
      alert('Failed to update transaction status')
      return
    }

    setUpdatingTransaction({
      updating: false,
      item: null
    })
  }

  useEffect(() => {
    fetchTransactions().catch(console.error)
  }, [direction, updatingTransaction])

  return (
    <Styled.MainContainer>
      <BottomNavigation current="transactions" />

      <FAB iconName='plus' onClick={() => { setCreating(true) }} spinner={false} />

      {creating && (
        <BottomSheet onDismiss={() => { setCreating(false) }} title={`Create a new ODD ${direction}`}>
          <Create direction={direction} afterCreate={() => {
            setCreating(false)
            fetchTransactions().catch(console.error)
          }} />
        </BottomSheet>
      )}

      {updatingTransaction.updating && (
        <BottomSheet title='Update transaction' center onDismiss={() => {
          setUpdatingTransaction({
            updating: false,
            item: null
          })
        }}>
          <Styled.UpdateTransactionContainer>
            <p>Please, select the new transaction status:</p>

            <Styled.UpdateTransactionButtonContainer>
              <Styled.CanceledButton onClick={() => {
                if (updatingTransaction.item === null) {
                  return
                }

                updateStatus(updatingTransaction.item?.id, TRANSACTION_STATUS.CANCELED).catch(console.error)
              }}>
                Canceled <Icon name='times' spin={false} />
              </Styled.CanceledButton>

              <Styled.PaidButton onClick={() => {
                if (updatingTransaction.item === null) {
                  return
                }

                updateStatus(updatingTransaction.item?.id, TRANSACTION_STATUS.PAID).catch(console.error)
              }}>
                Paid <Icon name='check' spin={false} />
              </Styled.PaidButton>
            </Styled.UpdateTransactionButtonContainer>
          </Styled.UpdateTransactionContainer>
        </BottomSheet>
      )}

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
            <Styled.TransactionItem
              status={item.status}
              id={`transaction-${item.id}`}
              key={`transactions-${item.id}`}
              {...bindTransactionLongPress(item)}
            >
              <Styled.TransactionColumn>
                <Styled.TransactionTitle status={item.status}>{item.name}</Styled.TransactionTitle>
                <Styled.TransactionUpdated>{item.description}</Styled.TransactionUpdated>
              </Styled.TransactionColumn>

              <Styled.TransactionColumn>
                <Styled.TransactionValue status={item.status}>{item.value.toLocaleString()} BRL</Styled.TransactionValue>
                <Styled.TransactionStatus status={item.status}>{item.status.toUpperCase()}</Styled.TransactionStatus>
              </Styled.TransactionColumn>
            </Styled.TransactionItem>
          ))}
        </Styled.TransactionsList>
      </Styled.BodyContent>
    </Styled.MainContainer>
  )
}

export const TransactionsPage = AuthPage(Transactions)
