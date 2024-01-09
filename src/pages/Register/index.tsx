import React from 'react'
import * as Styled from './styles'

import Saturn from '../../assets/images/saturn.png'
import { Auth } from '../../infra/services/Auth'

import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../shared/components/Icon'
import { GuestPage } from '../../shared/middleware/GuestPage'
import { User } from '../../infra/services/User'

const Register = (): React.ReactElement => {
  const navigate = useNavigate()
  const performLogin = async (email: string, password: string): Promise<void> => {
    const { ok, token, message } = await Auth.login(email, password)

    if (!ok) {
      // TODO: change to a notify toast
      alert(message)
      return
    }

    Auth.saveToken(token)
    await User.retrieveAndPersistMe()
    navigate('/home')
  }
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
          name: '',
          email: '',
          password: '',
          passwordConfirmation: ''
        }}
        onSubmit={async (values) => {
          const { ok, message } = await Auth.register(values.name, values.email, values.password, values.passwordConfirmation)

          if (!ok) {
            alert(message)
            return
          }

          await performLogin(values.email, values.password)
        }}
      >
        {({
          isSubmitting,
          handleSubmit
        }) => (
          <Styled.FormContainer onSubmit={handleSubmit}>
            <Styled.Label>Name</Styled.Label>
            <Styled.Input placeholder="John Doe" required name="name" />
            <Styled.Label>E-mail</Styled.Label>
            <Styled.Input placeholder="your_best_email@domain.com" type="email" required name="email" />
            <Styled.Label>Password:</Styled.Label>
            <Styled.Input type='password' placeholder='********' required name="password" />
            <Styled.Label>Confirm your password:</Styled.Label>
            <Styled.Input type='password' placeholder='********' required name="passwordConfirmation" />

            <Styled.SubmitButton type="submit" disabled={isSubmitting}>
              Register {isSubmitting ? <Icon name="spinner" spin /> : ''}
            </Styled.SubmitButton>
            <Styled.RegisterAnchor href="/">I already have an account</Styled.RegisterAnchor>
          </Styled.FormContainer>
        )}
      </Formik>
    </Styled.Container>
  )
}

export const RegisterPage = GuestPage(Register)
