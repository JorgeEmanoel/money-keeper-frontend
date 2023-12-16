import React from 'react'
import * as Styled from './styles'

import Saturn from '../../assets/images/saturn.png'

import { Auth } from '../../infra/services/Auth'

import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../shared/components/Icon'
import { GuestPage } from '../../shared/middleware/GuestPage'

const Login = (): React.ReactElement => {
  const navigate = useNavigate()

  return (
    <Styled.Container>
      <Styled.Image src={Saturn} />
      <Styled.MainTitle>
        Saturn
      </Styled.MainTitle>

      <Styled.WelcomeMessage>
        Welcome. Fill the form bellow to start managing your finances
      </Styled.WelcomeMessage>

      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={async ({ email, password }) => {
          const { ok, token, message } = await Auth.login(email, password)

          if (!ok) {
            // TODO: change to a notify toast
            alert(message)
            return
          }

          Auth.saveToken(token)
          navigate('/home')
        }}
      >
        {({
          isSubmitting,
          handleSubmit
        }) => (
          <Styled.FormContainer>
            <Styled.Label>E-mail:</Styled.Label>
            <Styled.Input placeholder="john doe" type="email" name="email" required />
            <Styled.Label>Password:</Styled.Label>
            <Styled.Input type="password" placeholder="********" name="password" />

            <Styled.SubmitButton type="submit" disabled={isSubmitting}>
              Login
              {isSubmitting && <Icon name="spinner" spin />}
            </Styled.SubmitButton>
            <Styled.RegisterAnchor href="/register">I do not have an account</Styled.RegisterAnchor>
          </Styled.FormContainer>
        )}
      </Formik>
    </Styled.Container>
  )
}

export const LoginPage = GuestPage(Login)
