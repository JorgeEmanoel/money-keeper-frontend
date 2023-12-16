import styled, { css } from 'styled-components'

export const Container = styled.div`
  background: linear-gradient(170deg, rgba(21,15,25,1) 32%, rgba(45,37,50,1) 56%, rgba(50,46,56,1) 100%);
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 48px;
  position: fixed;
`

export const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`

interface ButtonProps {
  active: boolean
}
export const Item = styled.button<ButtonProps>`
  border-radius: 16px;
  color: #cccccc;
  font-size: 20px;
  padding: 16px 24px;
  border: none;
  background: none;

  ${({ active }) => active
    ? css`
    font-weight: bold;
    color: #ffffff;
    background: linear-gradient(170deg, rgba(79,2,145,1) 32%, rgba(98,22,173,1) 56%, rgba(166,108,249,1) 100%);
  `
    : ''}
`
