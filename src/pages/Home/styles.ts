import styled from 'styled-components'

// Main Container: full page content
export const MainContainer = styled.div`
  margin: 0;
  min-height: 100vh;
  padding: 0;
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

export const CardSelector = styled.button`
  font-size: 24px;
  font-weight: bold;
  padding: 16px;
  margin: -16px;
  background: none;
  border: none;
  box-shadown: none;
  outline: none;
  color: white;
`

export const CardLabel = styled.span`
  font-size: 14px;
`

export const CardValue = styled.span`
  font-size: 18px;
  font-weight: bold;
`
