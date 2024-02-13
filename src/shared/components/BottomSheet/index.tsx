import React, { useRef } from 'react'

import * as Styled from './styles'
import { Icon } from '../Icon'

interface BottomSheetProps {
  children: React.ReactNode
  onDismiss: () => void
  title?: string
  center?: boolean
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ children, onDismiss, title = '', center = false }): React.ReactElement => {
  const backdropRef = useRef(null)
  const onClick = (ev: React.MouseEvent): void => {
    if (ev.target !== backdropRef.current) {
      return
    }

    onDismiss()
  }

  return (
    <Styled.BackDrop onClick={onClick} ref={backdropRef}>
      <Styled.Container center={center}>
        {title.length > 0 && (
          <Styled.Title>{title}</Styled.Title>
        )}
        <Styled.CloseButton type="button" onClick={onDismiss}>
          <Icon name="times" />
        </Styled.CloseButton>

        {children}
      </Styled.Container>
    </Styled.BackDrop>
  )
}
