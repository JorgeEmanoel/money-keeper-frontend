import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BottomNavigation } from '../../shared/components/BottomNavigation'
import { AuthPage } from '../../shared/middleware/AuthPage'

import * as Styled from './styles'

import { ProfileHeader } from '../../shared/components/ProfileHeader'
import { Plan } from '../../infra/services/Plan'
import { Icon } from '../../shared/components/Icon'
import { type TTransaction } from '../../infra/shared/types/Transactions'
import { Transaction } from '../../infra/services/Transaction'
import { type TInitStatus } from '../../infra/shared/types/Plan'
import { FAB } from '../../shared/components/FAB'
import { Period } from '../../infra/services/Period'
import { BottomSheet } from '../../shared/components/BottomSheet'
import { PickPeriod } from './Forms/PickPeriod'
import { Money } from '../../shared/utils/Money'

interface SummaryProps {
  totalIncomings: number
  totalOutcomings: number
  balance: number
  initStatus: TInitStatus
  loadingInit: boolean
}

interface TransactionsState {
  loading: boolean
  items: TTransaction[]
}

const Home = (): React.ReactElement => {
  const { t } = useTranslation()
  const [transactionsState, setTransactionsState] = useState<TransactionsState>({
    loading: true,
    items: []
  })
  const [loadingSummary, setLoadingSummary] = useState(false)
  const [loadingInit, setLoadingInit] = useState(false)
  const [summary, setSummary] = useState<SummaryProps>({
    totalIncomings: 0,
    totalOutcomings: 0,
    balance: 0,
    initStatus: 'initiated',
    loadingInit: false
  })
  const [pickingPeriod, setPickingPeriod] = useState(false)

  const fetchSummary = async (): Promise<void> => {
    setLoadingSummary(true)

    const result = await Plan.summary(Period.current().filterFormat)

    setSummary({
      totalOutcomings: result.totalOutcomings,
      totalIncomings: result.totalIncomings,
      balance: result.balance,
      initStatus: result.initStatus,
      loadingInit: false
    })

    setLoadingSummary(false)
  }

  const fetchTransactions = async (): Promise<void> => {
    setTransactionsState(before => ({ ...before, loading: true }))
    const result = await Transaction.outcoming(Period.current().filterFormat)

    let items: TTransaction[] = []

    if (result.ok) {
      items = result.transactions
    }

    setTransactionsState({ items, loading: true })
  }

  const handleInit = async (): Promise<void> => {
    setLoadingInit(true)
    const result = await Plan.init(Period.current().filterFormat)
    setLoadingInit(false)

    if (!result.ok) {
      setTimeout(alert, 500, result.message)
      return
    }

    await Promise.all([
      fetchTransactions(),
      fetchSummary()
    ])
  }

  useEffect(() => {
    fetchSummary().catch(console.error)
    fetchTransactions().catch(console.error)
  }, [pickingPeriod])

  return (
    <Styled.MainContainer>
      <BottomNavigation current="home" />
      {pickingPeriod && (
        <BottomSheet onDismiss={() => { setPickingPeriod(false) } } title={t('home.period.pick')} center={true}>
          <PickPeriod
            defaultMonth={Period.month()}
            defaultYear={Period.year()}
            onPick={(month: number, year: number) => {
              Period.setCurrent(month, year)
              setPickingPeriod(false)
            }}
          />
        </BottomSheet>
      )}

      <ProfileHeader />
      {summary.initStatus === 'pending' && (
        <FAB
          disabled={loadingInit}
          spinner={loadingInit}
          iconName="play"
          onClick={() => {
            if (!confirm('Are you sure you want to generate the transcations?')) {
              return
            }

            handleInit().catch(console.error)
          }}
        />
      )}

      <Styled.BodyContainer>
        <Styled.CardContainer>
          <Styled.CardRow>
            <Styled.CardColumn>
              <Styled.CardSelector onClick={() => { setPickingPeriod(true) }}>
                {Period.current().displayFormat}
                {' '}
                <Icon name='pencil' fontSize={16} />
              </Styled.CardSelector>
            </Styled.CardColumn>
          </Styled.CardRow>

          <Styled.CardRow>
            <Styled.CardColumn>
              <Styled.CardLabel>{t('general.domain.balance')}</Styled.CardLabel>
              <Styled.CardValue>
                {loadingSummary && <Icon name="spinner" spin />}
                {!loadingSummary && (
                  <>
                    {Money.toLocale(summary.balance)}
                  </>
                )}
              </Styled.CardValue>
            </Styled.CardColumn>
          </Styled.CardRow>

          <Styled.CardRow>
            <Styled.CardColumn>
              <Styled.CardLabel>{t('general.domain.income')}</Styled.CardLabel>
              <Styled.CardValue>
                {loadingSummary && <Icon name="spinner" spin />}
                {!loadingSummary && (
                  <>
                    {Money.toLocale(summary.totalIncomings)}
                  </>
                )}
              </Styled.CardValue>
            </Styled.CardColumn>

            <Styled.CardColumn>
              <Styled.CardLabel>{t('general.domain.outcome')}</Styled.CardLabel>
              <Styled.CardValue>
                {loadingSummary && <Icon name="spinner" spin />}
                {!loadingSummary && (
                  <>
                    {Money.toLocale(summary.totalOutcomings)}
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
              <Styled.BodyListElementValue>{Money.toLocale(t.value)}</Styled.BodyListElementValue>
            </Styled.BodyListElement>
          ))}
        </Styled.BodyList>
      </Styled.BodyContainer>
    </Styled.MainContainer>
  )
}

export const HomePage = AuthPage(Home)
