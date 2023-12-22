import React from 'react'

import * as Styled from './styles'

export const ProfileHeader = (): React.ReactElement => {
  return (
    <Styled.TopContainer>
      <Styled.ProfileContainer>
        <Styled.ProfileRow>
          <Styled.ProfileColumn>
            <Styled.ProfilePicture src="https://i.ytimg.com/vi/cAEw1J_x6C4/hqdefault.jpg" />
          </Styled.ProfileColumn>

          <Styled.ProfileColumn>
            <Styled.ProfileWelcomeMessage>
                Welcome back,
            </Styled.ProfileWelcomeMessage>
            <Styled.ProfileName>
                Mr Beetle Juice
            </Styled.ProfileName>
          </Styled.ProfileColumn>
        </Styled.ProfileRow>
      </Styled.ProfileContainer>
    </Styled.TopContainer>
  )
}
