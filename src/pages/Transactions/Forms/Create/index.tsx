import React from 'react'
import { Formik } from 'formik'

import { type TDirection } from '../../../../infra/shared/types/Transactions'
import { Transaction } from '../../../../infra/services/Transaction'
import { Period } from '../../../../infra/services/Period'
import { Icon } from '../../../../shared/components/Icon'

import * as Styled from './styles'

interface CreateProps {
  afterCreate: () => void
  direction: TDirection
}

export const Create: React.FC<CreateProps> = ({ afterCreate, direction }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        frequency: 'monthly',
        value: 0,
        currency: 'BRL'
      }}
      onSubmit={async ({ name, description, value }) => {
        const period = Period.current()
        const response = await Transaction.create({
          name,
          description,
          direction,
          period,
          value: Number(value),
          currency: 'BRL'
        })

        if (response.ok) {
          afterCreate()
          return
        }

        alert('Failed to create the transaction. Please try again later')
        console.error('Failed to create transaction')
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

          <Styled.Label>Value</Styled.Label>
          <Styled.Input name="value" type="text" required />

          <Styled.SubmitButton type="submit" disabled={isSubmitting}>
            Save
            {isSubmitting && <Icon name="spinner" spin />}
          </Styled.SubmitButton>
        </Styled.FormContainer>
      )}
    </Formik>
  )
}
