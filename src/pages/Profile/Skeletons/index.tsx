import React, { useEffect, useState } from 'react'

import * as Styled from './styles'

import { AuthPage } from '../../../shared/middleware/AuthPage'
import { BottomNavigation } from '../../../shared/components/BottomNavigation'
import { Icon } from '../../../shared/components/Icon'
import { BottomSheet } from '../../../shared/components/BottomSheet'
import { Formik } from 'formik'
import { Skeleton } from '../../../infra/services/Skeleton'
import { User } from '../../../infra/services/User'
import { type TSkeleton, type TCurrency, type TDirection, type TFrequency } from '../../../infra/shared/types/Skeletons'
import { PlaceHolder } from '../../../shared/components/Placeholder'
import { Money } from '../../../shared/utils/Money'
import { useTranslation } from 'react-i18next'
import { Locale } from '../../../infra/services/Locale'

interface SkeletonState {
  loading: boolean
  items: TSkeleton[]
  total: number
}

const Skeletons = (): React.ReactElement => {
  const { t } = useTranslation()
  const [direction, setDirection] = useState<TDirection>('outcome')
  const [creating, setCreating] = useState(false)
  const [skeletonsState, setSkeletonsState] = useState<SkeletonState>({
    loading: false,
    items: [],
    total: 0
  })
  const [excluding, setExcluding] = useState(0)

  const user = User.me()

  const fetchAndRenderSkeletons = async (): Promise<void> => {
    setSkeletonsState(before => ({ items: before.items, total: before.total, loading: true }))

    const fetchingMap = {
      income: Skeleton.incoming,
      outcome: Skeleton.outcoming
    }

    const skeletons = await fetchingMap[direction](user.currentPlanId)
    let items: TSkeleton[] = []
    let total = skeletonsState.total

    if (skeletons.ok) {
      items = skeletons.skeletons
      total = skeletons.total
    }

    setSkeletonsState({ items, loading: false, total })
  }

  const exclude = async (): Promise<void> => {
    const result = await Skeleton.exclude(user.currentPlanId, excluding)

    if (!result.ok) {
      alert(t('skeletons.failedToDelete'))
    }

    setExcluding(0)
    await fetchAndRenderSkeletons()
  }

  useEffect(() => {
    fetchAndRenderSkeletons().catch(console.error)
  }, [creating, direction])

  return (
    <Styled.MainContainer>
      {creating && (
        <BottomSheet onDismiss={() => { setCreating(false) }}>
          <Formik
            initialValues={{
              name: '',
              description: '',
              direction,
              frequency: 'monthly',
              value: '',
              currency: Locale.currency()
            }}
            onSubmit={async ({ name, description, direction, frequency, value, currency }) => {
              const response = await Skeleton.create({
                name,
                description,
                direction: direction as TDirection,
                frequency: frequency as TFrequency,
                value,
                currency: currency as TCurrency,
                planId: user.currentPlanId
              })

              if (response.ok) {
                setCreating(false)
                return
              }

              alert(t('skeletons.failedToCreate'))
              console.error('Failed to create skeleton')
            }}
          >
            {({
              isSubmitting
            }) => (
              <Styled.FormContainer>
                <Styled.Label>{t('fields.name')}</Styled.Label>
                <Styled.Input name="name" type="text" required maxlength="40" />

                <Styled.Label>{t('fields.description')}</Styled.Label>
                <Styled.Input name="description" type="text" required maxlength="250" />

                <Styled.Label>{t('fields.value')}</Styled.Label>
                <Styled.Input name="value" type="text" required />

                <Styled.Input name="frequency" type="hidden" value="monthly" required />
                <Styled.Input name="currency" type="hidden" value="BRL" required />

                <Styled.SubmitButton type="submit" disabled={isSubmitting}>
                  {t('general.button.save')}
                  {isSubmitting && <Icon name="spinner" spin />}
                </Styled.SubmitButton>
              </Styled.FormContainer>
            )}
          </Formik>
        </BottomSheet>
      )}

      {excluding !== 0 && (
        <BottomSheet onDismiss={() => { setExcluding(0) }}>
          {t('skeletons.deleteQuestion')}?

          <br />

          <Styled.DeleteContainer>
            <Styled.ButtonContainer>
              <Styled.CancelButton onClick={() => { setExcluding(0) }}>
                {t('general.button.cancel')}
              </Styled.CancelButton>
            </Styled.ButtonContainer>

            <Styled.ButtonContainer>
              <Styled.DeleteButton onClick={() => { exclude().catch(console.error) }}>
                {t('general.button.delete')} <Icon name="trash" />
              </Styled.DeleteButton>
            </Styled.ButtonContainer>
          </Styled.DeleteContainer>
        </BottomSheet>
      )}

      <BottomNavigation current="profile" />
      <Styled.AddButton type="button" onClick={() => { setCreating(true) }}>
        <Icon name="plus" />
      </Styled.AddButton>

      <Styled.Title>{t('skeletons.title')}</Styled.Title>
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
              Total
            </Styled.ResumeLabel>
            <Styled.ResumeValue>
              {Money.toLocale(skeletonsState.total)}
            </Styled.ResumeValue>
          </Styled.ResumeItem>
        </Styled.ResumeContainer>

        <Styled.SkeletonsListTitle>
          {t('skeletons.mine')}
        </Styled.SkeletonsListTitle>

        <Styled.SkeletonsList>
          {skeletonsState.loading && (
            Array.from([0, 0, 0]).map(i => <PlaceHolder height='70px' margin='8px 0' key={`placeholder-${i}`} />)
          )}

          {!skeletonsState.loading && skeletonsState.items.map(item => (
            <Styled.SkeletonItem key={`skeleton-${item.id}`} onClick={() => { setExcluding(item.id) }}>
              <Styled.SkeletonColumn>
                <Styled.SkeletonTitle>{item.name}</Styled.SkeletonTitle>
                <Styled.SkeletonCreated>{item.description}</Styled.SkeletonCreated>
              </Styled.SkeletonColumn>

              <Styled.SkeletonColumn>
                <Styled.SkeletonValue>{Money.toLocale(item.value)}</Styled.SkeletonValue>
                <Styled.SkeletonFrequency>
                  {t(`general.domain.frequency.${item.frequency}`)}
                </Styled.SkeletonFrequency>
              </Styled.SkeletonColumn>
            </Styled.SkeletonItem>))
          }
        </Styled.SkeletonsList>
      </Styled.BodyContent>
    </Styled.MainContainer>
  )
}

export const SkeletonsPage = AuthPage(Skeletons)
