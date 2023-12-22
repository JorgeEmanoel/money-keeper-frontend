import styled from 'styled-components'

// Top Container: black card
export const TopContainer = styled.header`
  background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(34,34,34,1) 70%, rgba(51,51,51,1) 100%);
  display: flex;
  flex-direction: row;
  padding: 54px 24px 152px 24px;
`

// Profile Container: user informations
export const ProfileContainer = styled.div`
  color: #ffffff;
`

export const ProfileRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`

export const ProfileColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const ProfilePicture = styled.img`
  border-radius: 8px;
  box-shadow: 0 0 8px #112;
  height: 60px;
  margin-right: 8px;
  width: 60px;
`

export const ProfileWelcomeMessage = styled.div`
  font-size: 12px;
`

export const ProfileName = styled.div`
  font-size: 16px;
  font-weight: bold;
`
