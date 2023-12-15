import React from 'react'
import * as Styled from './styles'

import Saturn from '../../assets/images/saturn.png'

export const LoginPage = (): React.ReactElement => {
  return (
    <Styled.Container>
      <Styled.Image src={Saturn} />
      <Styled.MainTitle>
        Saturn
      </Styled.MainTitle>

      <Styled.WelcomeMessage>
        Welcome. Fill the form bellow to start managing your finances
      </Styled.WelcomeMessage>

      <Styled.FormContainer>
        <Styled.Label>Username</Styled.Label>
        <Styled.Input placeholder='john doe' />
        <Styled.Label>Password:</Styled.Label>
        <Styled.Input type='password' placeholder='********' />

        <Styled.SubmitButton type="submit">Login</Styled.SubmitButton>
        <Styled.RegisterAnchor href="/register">I do not have an account</Styled.RegisterAnchor>
      </Styled.FormContainer>
    </Styled.Container>
  )
}
