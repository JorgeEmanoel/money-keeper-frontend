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
import { PlaceHolder } from '../../shared/components/Placeholder'
import { Money } from '../../shared/utils/Money'
import { useTranslation } from 'react-i18next'

interface TransactionsState {
  items: TTransaction[]
  totalPending: number
  total: number
  loading: boolean
}

interface UpdatingTransactionState {
  item: TTransaction | null
  updating: boolean
  loading: boolean
}

const Transactions = (): React.ReactElement => {
  const { t } = useTranslation()
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
    loading: false,
    updating: false
  })

  const bindTransactionLongPress = useLongPress((_, { context: item }) => {
    // TODO: fix type
    setUpdatingTransaction({
      item: item as TTransaction,
      loading: false,
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
      alert(t('transactions.failedToUpdateStatus'))
      return
    }

    setUpdatingTransaction({
      updating: false,
      loading: false,
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
        <BottomSheet onDismiss={() => { setCreating(false) }} title={t('transactions.create.title')}>
          <Create direction={direction} afterCreate={() => {
            setCreating(false)
            fetchTransactions().catch(console.error)
          }} />
        </BottomSheet>
      )}

      {updatingTransaction.updating && (
        <BottomSheet title={t('transactions.status.secondaryTitle')} center onDismiss={() => {
          setUpdatingTransaction({
            updating: false,
            loading: false,
            item: null
          })
        }}>
          <Styled.UpdateTransactionContainer>
            <p>{t('transactions.status.mainTitle')}</p>
            <Styled.UpdateTransactionButtonContainer>
              <Styled.CanceledButton onClick={() => {
                if (updatingTransaction.item === null) {
                  return
                }

                updateStatus(updatingTransaction.item?.id, TRANSACTION_STATUS.CANCELED).catch(console.error)
              }}>
                {t('general.domain.transaction.canceled')} <Icon name='times' spin={updatingTransaction.loading} />
              </Styled.CanceledButton>

              <Styled.PaidButton onClick={() => {
                if (updatingTransaction.item === null) {
                  return
                }

                updateStatus(updatingTransaction.item?.id, TRANSACTION_STATUS.PAID).catch(console.error)
              }}>
                {t('general.domain.transaction.paid')} <Icon name='check' spin={updatingTransaction.loading} />
              </Styled.PaidButton>
            </Styled.UpdateTransactionButtonContainer>
          </Styled.UpdateTransactionContainer>
        </BottomSheet>
      )}

      <Styled.Title>{t('transactions.title')}</Styled.Title>
      <Styled.FilterContainer>
        <Styled.DirectionContainer>
          <Styled.DirectionItem onClick={() => { setDirection('income') }} type="button" side="left" active={direction === 'income'}>
            {t('general.domain.incomings')}
          </Styled.DirectionItem>
          <Styled.DirectionItem onClick={() => { setDirection('outcome') }} type="button" side="right" active={direction === 'outcome'}>
            {t('general.domain.outcomings')}
          </Styled.DirectionItem>
        </Styled.DirectionContainer>
      </Styled.FilterContainer>

      <Styled.BodyContent>
        <Styled.ResumeContainer>
          <Styled.ResumeItem>
            <Styled.ResumeLabel>
              {t('general.domain.transaction.paid')}
            </Styled.ResumeLabel>
            <Styled.ResumeValue>
              {transactionsState.loading && (
                <PlaceHolder height='30px' margin='2px 0'/>
              )}

              {!transactionsState.loading && (
                <>
                  {Money.toLocale(transactionsState.total)}
                </>
              )}
            </Styled.ResumeValue>
          </Styled.ResumeItem>
          <Styled.ResumeItem>
            <Styled.ResumeLabel>
              {t('general.domain.transaction.pending')}
            </Styled.ResumeLabel>
            <Styled.ResumeValue>
              {transactionsState.loading && (
                <PlaceHolder height='30px' margin='2px 0'/>
              )}

              {!transactionsState.loading && (
                <>
                  {Money.toLocale(transactionsState.totalPending)}
                </>
              )}
            </Styled.ResumeValue>
          </Styled.ResumeItem>
        </Styled.ResumeContainer>

        <Styled.TransactionsListTitle>
          {t('transactions.last')}
        </Styled.TransactionsListTitle>

        <Styled.TransactionsList>
          {transactionsState.loading && Array.from([0, 1, 2]).map(t => (
            <PlaceHolder height='70px' margin='8px 0' key={`transaciton-placeholder-${t}`}/>
          ))}
          {!transactionsState.loading && transactionsState.items.map(item => (
            <Styled.TransactionItem
              status={item.status}
              id={`transaction-${item.id}`}
              key={`transactions-${item.id}`}
              onClick={() => {
                setUpdatingTransaction({
                  item,
                  loading: false,
                  updating: true
                })
              }}
              {...bindTransactionLongPress(item)}
            >
              <Styled.TransactionColumn>
                <Styled.TransactionTitle status={item.status}>{item.name}</Styled.TransactionTitle>
                <Styled.TransactionUpdated>{item.description}</Styled.TransactionUpdated>
              </Styled.TransactionColumn>

              <Styled.TransactionColumn>
                <Styled.TransactionValue status={item.status}>{Money.toLocale(item.value)}</Styled.TransactionValue>
                <Styled.TransactionStatus status={item.status}>
                  {t(`general.domain.transaction.${item.status}`).toUpperCase()}
                </Styled.TransactionStatus>
              </Styled.TransactionColumn>
            </Styled.TransactionItem>
          ))}
        </Styled.TransactionsList>
      </Styled.BodyContent>
    </Styled.MainContainer>
  )
}

export const TransactionsPage = AuthPage(Transactions)
