import styled from 'styled-components'

export const MainContainer = styled.div``

export const TopContainer = styled.header`
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(200,200,200,1) 70%, rgba(150,150,150,.1) 100%);
  display: flex;
  flex-direction: row;
  padding: 54px 24px;
`

export const ProfileContainer = styled.div`
  color: #333;
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

export const BodyContainer = styled.div``

export const BodyList = styled.div``

export const BodyItem = styled.a``
