import React from 'react'

import ProfilePicture from '../../../assets/images/img_generic-user.jpg'
import * as Styled from './styles'
import { User } from '../../../infra/services/User'

export const ProfileHeader = (): React.ReactElement => {
  const user = User.me()
  return (
    <Styled.TopContainer>
      <Styled.ProfileContainer>
        <Styled.ProfileRow>
          <Styled.ProfileColumn>
            <Styled.ProfilePicture src={ProfilePicture} />
          </Styled.ProfileColumn>

          <Styled.ProfileColumn>
            <Styled.ProfileWelcomeMessage>
                Welcome back,
            </Styled.ProfileWelcomeMessage>
            <Styled.ProfileName>
                Mr {user.name}
            </Styled.ProfileName>
          </Styled.ProfileColumn>
        </Styled.ProfileRow>
      </Styled.ProfileContainer>
    </Styled.TopContainer>
  )
}
