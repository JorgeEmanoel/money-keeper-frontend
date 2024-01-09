import React, { type ButtonHTMLAttributes } from 'react'

import * as Styled from './styles'
import { Icon } from '../Icon'

interface FABProps {
  iconName: string
  spinner: boolean
}

export const FAB: React.FC<FABProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({ iconName, spinner = false, ...props }) => {
  return (
    <Styled.Button {...props}>
      <Icon name={spinner ? 'spinner' : iconName} spin={spinner} />
    </Styled.Button>
  )
}
