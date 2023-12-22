import React from 'react'

import { AuthPage } from '../../../shared/middleware/AuthPage'

import * as Styled from './styles'

const Skeletons = (): React.ReactElement => {
  return <Styled.Container></Styled.Container>
}

export const SkeletonsPage = AuthPage(Skeletons)
