import React from 'react'
import { Formik } from 'formik'

import { type TDirection } from '../../../../infra/shared/types/Transactions'
import { Transaction } from '../../../../infra/services/Transaction'
import { Period } from '../../../../infra/services/Period'
import { Icon } from '../../../../shared/components/Icon'

import * as Styled from './styles'
import { useTranslation } from 'react-i18next'
import { Locale } from '../../../../infra/services/Locale'

interface CreateProps {
  afterCreate: () => void
  direction: TDirection
}

export const Create: React.FC<CreateProps> = ({ afterCreate, direction }) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        frequency: 'monthly',
        value: 0,
        currency: Locale.currency()
      }}
      onSubmit={async ({ name, description, value }) => {
        const period = Period.current()
        const response = await Transaction.create({
          name,
          description,
          direction,
          period: period.filterFormat,
          value: Number(value),
          currency: Locale.currency()
        })

        if (response.ok) {
          afterCreate()
          return
        }

        alert(t('transactions.faledToCreate'))
        console.error('Failed to create transaction')
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

          <Styled.SubmitButton type="submit" disabled={isSubmitting}>
            {t('general.button.save')}
            {isSubmitting && <Icon name="spinner" spin />}
          </Styled.SubmitButton>
        </Styled.FormContainer>
      )}
    </Formik>
  )
}
