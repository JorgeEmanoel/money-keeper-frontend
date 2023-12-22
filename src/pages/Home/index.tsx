import React from 'react'

import { BottomNavigation } from '../../shared/components/BottomNavigation'
import { AuthPage } from '../../shared/middleware/AuthPage'

import * as Styled from './styles'

import { ProfileHeader } from '../../shared/components/ProfileHeader'

const Home = (): React.ReactElement => {
  return (
    <Styled.MainContainer>
      <BottomNavigation current="home" />
      <ProfileHeader />

      <Styled.BodyContainer>
        <Styled.CardContainer>
          <Styled.CardRow>
            <Styled.CardColumn>
              <Styled.CardSelector>
                  March
              </Styled.CardSelector>
            </Styled.CardColumn>
          </Styled.CardRow>

          <Styled.CardRow>
            <Styled.CardColumn>
              <Styled.CardLabel>Balance</Styled.CardLabel>
              <Styled.CardValue>3000 USD</Styled.CardValue>
            </Styled.CardColumn>
          </Styled.CardRow>

          <Styled.CardRow>
            <Styled.CardColumn>
              <Styled.CardLabel>Income</Styled.CardLabel>
              <Styled.CardValue>4000 USD</Styled.CardValue>
            </Styled.CardColumn>

            <Styled.CardColumn>
              <Styled.CardLabel>Outcome</Styled.CardLabel>
              <Styled.CardValue>1000 USD</Styled.CardValue>
            </Styled.CardColumn>
          </Styled.CardRow>
        </Styled.CardContainer>

        <Styled.BodyList>
          <Styled.BodyListElement>
            <Styled.BodyListElementName>Rent</Styled.BodyListElementName>
            <Styled.BodyListElementValue>5200 USD</Styled.BodyListElementValue>
          </Styled.BodyListElement>
          <Styled.BodyListElement>
            <Styled.BodyListElementName>Car</Styled.BodyListElementName>
            <Styled.BodyListElementValue>5100 USD</Styled.BodyListElementValue>
          </Styled.BodyListElement>
          <Styled.BodyListElement>
            <Styled.BodyListElementName>Bike</Styled.BodyListElementName>
            <Styled.BodyListElementValue>1500 USD</Styled.BodyListElementValue>
          </Styled.BodyListElement>
          <Styled.BodyListElement>
            <Styled.BodyListElementName>Hospital</Styled.BodyListElementName>
            <Styled.BodyListElementValue>34500 USD</Styled.BodyListElementValue>
          </Styled.BodyListElement>
        </Styled.BodyList>
      </Styled.BodyContainer>
    </Styled.MainContainer>
  )
}

export const HomePage = AuthPage(Home)
