import { Field } from 'formik'
// import { Form } from 'react-router-dom'
import styled from 'styled-components'

export const FormContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label``

export const Input = styled(Field)`
  border: 1px solid rgb(98,22,173);
  border-radius: 8px;
  background: white;
  box-shadown: none;
  padding: 20px;
  font-size: 20px;
`

export const SaveButton = styled.button`
  background: linear-gradient(170deg, rgba(79,2,145,1) 32%, rgba(98,22,173,1) 56%, rgba(166,108,249,1) 100%);
  color: white;
  font-size: 24px;
  border-radius: 8px;
  border: none;
  padding: 16px 20px;
  margin-top: 24px;
`
