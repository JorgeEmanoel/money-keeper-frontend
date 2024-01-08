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

interface SkeletonState {
  loading: boolean
  items: TSkeleton[]
  total: number
}

const Skeletons = (): React.ReactElement => {
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
      alert('Failed to delete exclude')
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
              value: 0,
              currency: 'BRL'
            }}
            onSubmit={async ({ name, description, direction, frequency, value, currency }) => {
              const response = await Skeleton.create({
                name,
                description,
                direction: direction as TDirection,
                frequency: frequency as TFrequency,
                value: Number(value),
                currency: currency as TCurrency,
                planId: user.currentPlanId
              })

              if (response.ok) {
                setCreating(false)
                return
              }

              alert('Failed to create the skeleton. Please try again later')
              console.error('Failed to create skeleton')
            }}
          >
            {({
              isSubmitting
            }) => (
              <Styled.FormContainer>
                <Styled.Label>Name</Styled.Label>
                <Styled.Input name="name" type="text" required maxlength="40" />

                <Styled.Label>Description</Styled.Label>
                <Styled.Input name="description" type="text" required maxlength="250" />

                <Styled.Label>Frequency</Styled.Label>
                <Styled.Input name="frequency" as="select" required>
                  <option value="monthly">Monthly</option>
                </Styled.Input>

                <Styled.Label>Value</Styled.Label>
                <Styled.Input name="value" type="text" required />

                <Styled.Label>Currency</Styled.Label>
                <Styled.Input name="currency" as="select" required>
                  <option value="BRL">BRL</option>
                </Styled.Input>

                <Styled.SubmitButton type="submit" disabled={isSubmitting}>
                  Save
                  {isSubmitting && <Icon name="spinner" spin />}
                </Styled.SubmitButton>
              </Styled.FormContainer>
            )}
          </Formik>
        </BottomSheet>
      )}

      {excluding !== 0 && (
        <BottomSheet onDismiss={() => { setExcluding(0) }}>
          Delete?

          <br />

          <Styled.CancelButton onClick={() => { setExcluding(0) }}>
            Cancel
          </Styled.CancelButton>

          <Styled.DeleteButton onClick={() => { exclude().catch(console.error) }}>
            Yes, delete <Icon name="trash" />
          </Styled.DeleteButton>
        </BottomSheet>
      )}

      <BottomNavigation current="profile" />
      <Styled.AddButton type="button" onClick={() => { setCreating(true) }}>
        <Icon name="plus" />
      </Styled.AddButton>

      <Styled.Title>Skeletons</Styled.Title>
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
              {skeletonsState.total} BRL
            </Styled.ResumeValue>
          </Styled.ResumeItem>
        </Styled.ResumeContainer>

        <Styled.SkeletonsListTitle>
          My skeletons
        </Styled.SkeletonsListTitle>

        <Styled.SkeletonsList>
          {skeletonsState.items.map(item => (
            <Styled.SkeletonItem key={`skeleton-${item.id}`} onClick={() => { setExcluding(item.id) }}>
              <Styled.SkeletonColumn>
                <Styled.SkeletonTitle>{item.name}</Styled.SkeletonTitle>
                <Styled.SkeletonCreated>{item.description}</Styled.SkeletonCreated>
              </Styled.SkeletonColumn>

              <Styled.SkeletonColumn>
                <Styled.SkeletonValue>{item.value} {item.currency}</Styled.SkeletonValue>
                <Styled.SkeletonFrequency>{item.frequency}</Styled.SkeletonFrequency>
              </Styled.SkeletonColumn>
            </Styled.SkeletonItem>))
          }
        </Styled.SkeletonsList>
      </Styled.BodyContent>
    </Styled.MainContainer>
  )
}

export const SkeletonsPage = AuthPage(Skeletons)
