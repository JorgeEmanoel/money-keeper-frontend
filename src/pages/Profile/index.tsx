import React from 'react'

import * as Styled from './styles'
import { AuthPage } from '../../shared/middleware/AuthPage'
import { BottomNavigation } from '../../shared/components/BottomNavigation'

const Profile = (): React.ReactElement => {
  return (
    <Styled.MainContainer>
      <BottomNavigation current="profile" />
      <Styled.TopContainer>
        <Styled.ProfileContainer>
          <Styled.ProfileRow>
            <Styled.ProfileColumn>
              <Styled.ProfilePicture src="https://i.ytimg.com/vi/cAEw1J_x6C4/hqdefault.jpg" />
            </Styled.ProfileColumn>

            <Styled.ProfileColumn>
              <Styled.ProfileWelcomeMessage>
                Profile
              </Styled.ProfileWelcomeMessage>
              <Styled.ProfileName>
                Mr Beetle Juice
              </Styled.ProfileName>
            </Styled.ProfileColumn>
          </Styled.ProfileRow>
        </Styled.ProfileContainer>
      </Styled.TopContainer>

      <Styled.BodyContainer>
        <Styled.BodyList>
          <Styled.BodyItem href="#">
            My Skeletons
          </Styled.BodyItem>
          <Styled.BodyItem href="#">
            Logout
          </Styled.BodyItem>
        </Styled.BodyList>
      </Styled.BodyContainer>
    </Styled.MainContainer>
  )
}

export const ProfilePage = AuthPage(Profile)
