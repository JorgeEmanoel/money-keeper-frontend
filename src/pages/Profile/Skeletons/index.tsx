import React, { useState } from 'react'

import * as Styled from './styles'

import { AuthPage } from '../../../shared/middleware/AuthPage'
import { BottomNavigation } from '../../../shared/components/BottomNavigation'
// import { Icon } from '../../../shared/components/Icon'

type DirectionType = 'income' | 'outcome'

const Skeletons = (): React.ReactElement => {
  const [direction, setDirection] = useState<DirectionType>('income')

  return (
    <Styled.MainContainer>
      <BottomNavigation current="profile" />

      <Styled.Title>Skeletons</Styled.Title>
      <Styled.FilterContainer>
        <Styled.DirectionContainer>
          <Styled.DirectionItem onClick={() => { setDirection('income') }} type="button" side="left" active={direction === 'income'}>
            Incomes
          </Styled.DirectionItem>
          <Styled.DirectionItem onClick={() => { setDirection('outcome') }} type="button" side="right" active={direction === 'outcome'}>
            Outcomes
          </Styled.DirectionItem>
        </Styled.DirectionContainer>
      </Styled.FilterContainer>

      <Styled.BodyContent>
        <Styled.ResumeContainer>
          <Styled.ResumeItem>
            <Styled.ResumeLabel>
              Total
            </Styled.ResumeLabel>
            <Styled.ResumeValue>
              1250 USD
            </Styled.ResumeValue>
          </Styled.ResumeItem>
        </Styled.ResumeContainer>

        <Styled.SkeletonsListTitle>
          My skeletons
        </Styled.SkeletonsListTitle>

        <Styled.SkeletonsList>
          <Styled.SkeletonItem>
            <Styled.SkeletonColumn>
              <Styled.SkeletonTitle>Gamepass</Styled.SkeletonTitle>
              <Styled.SkeletonCreated>Two days ago</Styled.SkeletonCreated>
            </Styled.SkeletonColumn>

            <Styled.SkeletonColumn>
              <Styled.SkeletonValue>104 USD</Styled.SkeletonValue>
              <Styled.SkeletonFrequency>Monthly</Styled.SkeletonFrequency>
            </Styled.SkeletonColumn>
          </Styled.SkeletonItem>
        </Styled.SkeletonsList>
      </Styled.BodyContent>
    </Styled.MainContainer>
  )
}

export const SkeletonsPage = AuthPage(Skeletons)
