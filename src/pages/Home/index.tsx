import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'

import { BottomNavigation } from '../../shared/components/BottomNavigation'
import { AuthPage } from '../../shared/middleware/AuthPage'

import * as Styled from './styles'

import { ProfileHeader } from '../../shared/components/ProfileHeader'
import { Plan } from '../../infra/services/Plan'
import { Icon } from '../../shared/components/Icon'
import { type TTransaction } from '../../infra/shared/types/Transactions'
import { Transaction } from '../../infra/services/Transaction'

interface SummaryProps {
  totalIncomings: number
  totalOutcomings: number
  balance: number
}

interface TransactionsState {
  loading: boolean
  items: TTransaction[]
}

const Home = (): React.ReactElement => {
  const [transactionsState, setTransactionsState] = useState<TransactionsState>({
    loading: true,
    items: []
  })
  const [loadingSummary, setLoadingSummary] = useState(false)
  const [summary, setSummary] = useState<SummaryProps>({
    totalIncomings: 0,
    totalOutcomings: 0,
    balance: 0
  })

  const fetchSummary = async (): Promise<void> => {
    setLoadingSummary(true)

    const result = await Plan.summary(format(new Date(), 'yyyy-MM'))

    setSummary({
      totalOutcomings: result.totalOutcomings,
      totalIncomings: result.totalIncomings,
      balance: result.balance
    })

    setLoadingSummary(false)
  }

  const fetchTransactions = async (): Promise<void> => {
    setTransactionsState(before => ({ ...before, loading: true }))
    const result = await Transaction.outcoming()

    let items: TTransaction[] = []

    if (result.ok) {
      items = result.transactions
    }

    setTransactionsState({ items, loading: true })
  }

  useEffect(() => {
    fetchSummary().catch(console.error)
    fetchTransactions().catch(console.error)
  }, [])

  return (
    <Styled.MainContainer>
      <BottomNavigation current="home" />
      <ProfileHeader />

      <Styled.BodyContainer>
        <Styled.CardContainer>
          <Styled.CardRow>
            <Styled.CardColumn>
              <Styled.CardSelector>
                March
              </Styled.CardSelector>
            </Styled.CardColumn>
          </Styled.CardRow>

          <Styled.CardRow>
            <Styled.CardColumn>
              <Styled.CardLabel>Balance</Styled.CardLabel>
              <Styled.CardValue>
                {loadingSummary && <Icon name="spinner" spin />}
                {!loadingSummary && (
                  <>
                    {summary.balance.toLocaleString()} BRL
                  </>
                )}
              </Styled.CardValue>
            </Styled.CardColumn>
          </Styled.CardRow>

          <Styled.CardRow>
            <Styled.CardColumn>
              <Styled.CardLabel>Income</Styled.CardLabel>
              <Styled.CardValue>
                {loadingSummary && <Icon name="spinner" spin />}
                {!loadingSummary && (
                  <>
                    {summary.totalIncomings.toLocaleString()} BRL
                  </>
                )}
              </Styled.CardValue>
            </Styled.CardColumn>

            <Styled.CardColumn>
              <Styled.CardLabel>Outcome</Styled.CardLabel>
              <Styled.CardValue>
                {loadingSummary && <Icon name="spinner" spin />}
                {!loadingSummary && (
                  <>
                    {summary.totalOutcomings.toLocaleString()} BRL
                  </>
                )}
              </Styled.CardValue>
            </Styled.CardColumn>
          </Styled.CardRow>
        </Styled.CardContainer>

        <Styled.BodyList>
          {transactionsState.items.map(t => (
            <Styled.BodyListElement key={`transaction-${t.id}`}>
              <Styled.BodyListElementName>{t.name}</Styled.BodyListElementName>
              <Styled.BodyListElementValue>{t.value.toLocaleString()} BRL</Styled.BodyListElementValue>
            </Styled.BodyListElement>
          ))}
        </Styled.BodyList>
      </Styled.BodyContainer>
    </Styled.MainContainer>
  )
}

export const HomePage = AuthPage(Home)
