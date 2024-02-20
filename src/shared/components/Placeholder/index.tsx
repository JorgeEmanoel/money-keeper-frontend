import React from 'react'

import * as Styled from './style'

interface PlaceHolderProps extends Styled.ContainerProps {
}
const PlaceHolder: React.FC<PlaceHolderProps> = (props) => {
  return (
    <Styled.Container height={props.height} margin={props.margin}>
    </Styled.Container>
  )
}

export { PlaceHolder }
