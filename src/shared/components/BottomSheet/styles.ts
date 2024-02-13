import styled, { css } from 'styled-components'

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .7);
  z-index: 998;
`

interface ContainerProps {
  center: boolean
}
export const Container = styled.div<ContainerProps>`
  position: absolute;
  height: 85%;
  overflow-y: scroll;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  border-radius: 16px 16px 0 0;
  background: #fff;
  padding-top: 32px;

  ${({ center }) => center
    ? css`
    display: flex;
    align-items: center;
    justify-content: center;
    `
    : ''}
`

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  color: #333;
  padding: 16px;
  border: none;
  outline: none;
  margin: none;
  background: none;
  font-size: 24px;
`

export const Title = styled.h4`
  position: absolute;
  top: 24px;
  left: 24px;
  font-size: 20px;
  font-weight: bold;
  margin-top: -8px;
  color: #666;
`
