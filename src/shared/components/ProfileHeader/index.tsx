import React from 'react'

import ProfilePicture from '../../../assets/images/img_generic-user.jpg'
import * as Styled from './styles'
import { User } from '../../../infra/services/User'
import { useTranslation } from 'react-i18next'

export const ProfileHeader = (): React.ReactElement => {
  const user = User.me()
  const { t } = useTranslation()

  return (
    <Styled.TopContainer>
      <Styled.ProfileContainer>
        <Styled.ProfileRow>
          <Styled.ProfileColumn>
            <Styled.ProfilePicture src={ProfilePicture} />
          </Styled.ProfileColumn>

          <Styled.ProfileColumn>
            <Styled.ProfileWelcomeMessage>
              {t('home.welcome')}
            </Styled.ProfileWelcomeMessage>
            <Styled.ProfileName>
              {user.name}
            </Styled.ProfileName>
          </Styled.ProfileColumn>
        </Styled.ProfileRow>
      </Styled.ProfileContainer>
    </Styled.TopContainer>
  )
}
