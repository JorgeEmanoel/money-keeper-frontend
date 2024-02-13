import React from 'react'
import { Formik } from 'formik'

import * as Styled from './styles'
import { Icon } from '../../../../shared/components/Icon'

interface PickPeriodProps {
  defaultMonth: number
  defaultYear: number
  onPick: (month: number, year: number) => void
}

const PickPeriod: React.FC<PickPeriodProps> = ({ defaultMonth, defaultYear, onPick }) => {
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
              <Styled.Label>Month</Styled.Label>
              <Styled.Input name="month" type="number" min="1" max="12" />
            </Styled.FormGroup>

            <Styled.FormGroup>
              <Styled.Label>Year</Styled.Label>
              <Styled.Input name="year" type="number" />
            </Styled.FormGroup>
          </Styled.Row>

          <Styled.Row>
            <Styled.FormGroup>
              <Styled.SaveButton type='submit'>
                Save <Icon name={isSubmitting ? 'spinner' : 'save'} spin={isSubmitting} />
              </Styled.SaveButton>
            </Styled.FormGroup>
          </Styled.Row>
        </Styled.FormContainer>
      )}
    </Formik>
  )
}

export { PickPeriod }
