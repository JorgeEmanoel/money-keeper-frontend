import styled from 'styled-components'

import { Form, Field } from 'formik'

export const Container = styled.div`
  align-items: center;
  background: linear-gradient(194deg, rgba(2,0,36,1) 0%, rgba(28,28,133,1) 35%, rgba(24,79,150,1) 44%, rgba(171,0,255,1) 100%);
  background: rgb(2,0,36);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
  min-width: 100vw;
`

export const Image = styled.img`
  width: 100px;
  height: 100px;
`

export const MainTitle = styled.h2`
  color: white;
  font-weight: bold;
  margin: 0;
  max-width: 100px;
  padding: 8px;
`

export const WelcomeMessage = styled.p`
  color: white;
  font-size: 12px;
  margin: 0;
  max-width: 300px;
  padding: 8px;
  text-align: center;
`

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  color: white;
  font-weight: 600;
  margin-top: 8px;
  padding-left: 0;
  padding: 8px;
`

export const Input = styled(Field)`
  border-radius: 5px;
  border: 0;
  box-shadow: 0 0 8px #fff;
  color: #333;
  padding: 8px 16px;
`

export const SubmitButton = styled.button`
  background: white;
  border-radius: 8px;
  border: 0;
  box-shadow: 0 0 8px #fff;
  color: #333;
  cursor: pointer;
  font-weight: bold;
  margin-top: 30px;
  padding: 8px 16px;
  transition: all .3s;

  &:hover {
    background: #fee;
    box-shadow: 0 0 2px #c0c0c0;
  }
`

export const RegisterAnchor = styled.a`
  color: white;
  margin-top: 8px;
  text-decoration: underline;
`
