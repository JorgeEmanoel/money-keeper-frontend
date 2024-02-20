import React from 'react'

import * as Styled from './styles'
import { AuthPage } from '../../shared/middleware/AuthPage'
import { BottomNavigation } from '../../shared/components/BottomNavigation'
import { Icon } from '../../shared/components/Icon'
import { Auth } from '../../infra/services/Auth'
import { useNavigate } from 'react-router-dom'
import { ProfileHeader } from '../../shared/components/ProfileHeader'

const Profile = (): React.ReactElement => {
  const navigate = useNavigate()

  const logout = (): void => {
    if (!confirm('Are you sure you want to logout?')) {
      return
    }

    Auth.clear()
    navigate('/')
  }

  return (
    <Styled.MainContainer>
      <BottomNavigation current="profile" />
      <ProfileHeader />

      <Styled.BodyContainer>
        <Styled.BodyList>
          <Styled.BodyItem href="#" onClick={() => { navigate('/profile/skeletons') }}>
            Skeletons
            <Styled.BodyItemIcon>
              <Icon name="dollar" />
            </Styled.BodyItemIcon>
          </Styled.BodyItem>
          <Styled.BodyItem active={false} href="#" onClick={() => { navigate('/profile/skeletons') }}>
            Plans
            <Styled.BodyItemLabel>Soon</Styled.BodyItemLabel>
          </Styled.BodyItem>
          <Styled.BodyItem active={false} href="#" onClick={() => { navigate('/profile/skeletons') }}>
            Settings

            <Styled.BodyItemLabel>Soon</Styled.BodyItemLabel>
          </Styled.BodyItem>
          <Styled.BodyItem danger={true} href="#" onClick={logout}>
            Logout
            <Styled.BodyItemIcon>
              <Icon name="signout" />
            </Styled.BodyItemIcon>
          </Styled.BodyItem>
        </Styled.BodyList>
      </Styled.BodyContainer>
    </Styled.MainContainer>
  )
}

export const ProfilePage = AuthPage(Profile)
