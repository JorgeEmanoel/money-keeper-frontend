import styled, { css, keyframes } from 'styled-components'

const SlideAnimation = keyframes`
  0% {
    width: 10px;
    left: -5px;
  }

  50% {
    width: 50%;
    right: 50%;
  }

  100% {
    width: 10px;
    left: calc(100% - 10px);
  }
`

export interface ContainerProps {
  height: string
  margin: string
}
export const Container = styled.div<ContainerProps>`
  ${({ height, margin }) => css`
    height: ${height};
    margin: ${margin};
    `}
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 0 16px #eee;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    position: absolute;
    height: 100%;
    width: 10%;
    background: rgba(200, 200, 200, .1);
    left: -5px;
    top: 0;
    animation-name: ${SlideAnimation};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
  }
`
