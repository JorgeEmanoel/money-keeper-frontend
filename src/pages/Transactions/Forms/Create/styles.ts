import styled from 'styled-components'
import { Form, Field } from 'formik'

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  color: #666;
  font-weight: 600;
  margin-top: 16px;
  padding-left: 0;
  padding: 8px;
  margin-left: 0;
`

export const Input = styled(Field)`
  border-radius: 5px;
  border: 0;
  border: 1px solid #ddd;
  color: #333;
  padding: 16px 8px;
`

export const SubmitButton = styled.button`
  background: green;
  border-radius: 8px;
  border: 0;
  box-shadow: 0 0 10px #fff;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  margin-top: 32px;
  padding: 16px;
  transition: all .3s;

  &:hover {
    background: #fee;
    box-shadow: 0 0 2px #c0c0c0;
  }
`
