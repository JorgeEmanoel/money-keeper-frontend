import styled from 'styled-components'

// Main Container: full page content
export const MainContainer = styled.div`
  margin: 0;
  min-height: 100vh;
  padding: 0;
`

// Top Container: black card
export const TopContainer = styled.header`
  background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(34,34,34,1) 70%, rgba(51,51,51,1) 100%);
  display: flex;
  flex-direction: row;
  padding: 54px 24px 152px 24px;
`

// Body Container: white part
export const BodyContainer = styled.div`
  padding: 32px 24px;
`

export const BodyList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 32px 24px;
`

export const BodyListElement = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
`

export const BodyListElementName = styled.span``

export const BodyListElementValue = styled.span`
  font-weight: bold;
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

// Card Container: the purple card
export const CardContainer = styled.div`
  background: linear-gradient(170deg, rgba(79,2,145,1) 32%, rgba(98,22,173,1) 56%, rgba(166,108,249,1) 100%);
  border-radius: 20px;
  box-shadow: 0 0 8px #000;
  color: white;
  display: flex;
  flex-direction: column;
  margin-top: -160px;
  padding: 20px 30px;
`

export const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
`

export const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const CardSelector = styled.div`
  font-size: 24px;
  font-weight: bold;
`

export const CardLabel = styled.span`
  font-size: 14px;
`

export const CardValue = styled.span`
  font-size: 18px;
  font-weight: bold;
`
