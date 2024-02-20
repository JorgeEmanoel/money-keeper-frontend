import styled, { css } from 'styled-components'

export const MainContainer = styled.div``

export const BodyContainer = styled.div`
  padding: 20px;
`

interface BodyItemProps {
  danger?: boolean
  active?: boolean
}
export const BodyItem = styled.a<BodyItemProps>`
  display: block;
  text-decoration: none;
  background: #eee;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  padding: 20px;
  border-top: 1px solid #c0c0c0;
  border-bottom: 1px solid #eee;

  &:first-child {
    border-radius: 16px 16px 0 0;
    border-top: none;
  }

  &:last-child {
    border-radius: 0 0 16px 16px;
    border-bottom: none;
  }

  ${({ active = true }) => !active
    ? css`
      color: #c0c0c0;
      background: #eee;
      cursor: default;
    `
    : ''}

  ${({ danger = false }) => danger
    ? css`
      background: linear-gradient(170deg, rgba(79,2,145,1) 32%, rgba(98,22,173,1) 56%, rgba(166,108,249,1) 100%);
      color: #fff;
    `
    : ''}
`

export const BodyItemLogout = styled.a`
  display: block;
  text-decoration: none;
  background: darkred;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 20px;
`

export const BodyItemIcon = styled.div`
  display: block;
  float: right;
`

export const BodyItemLabel = styled.div`
  border-radius: 16px;
  display: block;
  float: right;
  font-size: 12px;
  color: white;
  font-weight: normal;
  padding: 6px 12px;
  background: linear-gradient(170deg, rgba(79,2,145,1) 32%, rgba(98,22,173,1) 56%, rgba(166,108,249,1) 100%);
`

export const BodyList = styled.div`
  border-radius: 16px;
  box-shadow: 0 0 16px #333;
  margin-top: -100px;
`
