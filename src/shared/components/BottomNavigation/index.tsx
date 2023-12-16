import React from 'react'

import { Icon } from '../Icon'

import * as Styled from './styles'
import { useNavigate } from 'react-router-dom'

interface BottomNavigationProps {
  current: string
}

export const BottomNavigation = ({ current }: BottomNavigationProps): React.ReactElement => {
  const navigate = useNavigate()

  return (
    <Styled.Container>
      <Styled.List>
        <Styled.Item onClick={() => { navigate('/home') }} active={current === 'home'}>
          <Icon name="home" />
        </Styled.Item>
        <Styled.Item onClick={() => { navigate('/transactions') }} active={current === 'transactions'}>
          <Icon name="bars" />
        </Styled.Item>
        <Styled.Item onClick={() => { navigate('/profile') }} active={current === 'profile'}>
          <Icon name="user" />
        </Styled.Item>
      </Styled.List>
    </Styled.Container>
  )
}
