import React from 'react'
import { Formik } from 'formik'

import * as Styled from './styles'
import { Icon } from '../../../../shared/components/Icon'
import { useTranslation } from 'react-i18next'

interface PickPeriodProps {
  defaultMonth: number
  defaultYear: number
  onPick: (month: number, year: number) => void
}

const PickPeriod: React.FC<PickPeriodProps> = ({ defaultMonth, defaultYear, onPick }) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{
        month: defaultMonth,
        year: defaultYear
      }}
      onSubmit={async ({ month, year }) => {
        onPick(month, year)
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Styled.FormContainer onSubmit={handleSubmit}>
          <Styled.Row>
            <Styled.FormGroup>
              <Styled.Label>{t('general.fields.month')}</Styled.Label>
              <Styled.Input name="month" type="number" min="1" max="12" />
            </Styled.FormGroup>

            <Styled.FormGroup>
              <Styled.Label>{t('general.fields.year')}</Styled.Label>
              <Styled.Input name="year" type="number" />
            </Styled.FormGroup>
          </Styled.Row>

          <Styled.Row>
            <Styled.FormGroup>
              <Styled.SaveButton type='submit'>
                {t('general.button.select')} <Icon name={isSubmitting ? 'spinner' : 'check'} spin={isSubmitting} />
              </Styled.SaveButton>
            </Styled.FormGroup>
          </Styled.Row>
        </Styled.FormContainer>
      )}
    </Formik>
  )
}

export { PickPeriod }
