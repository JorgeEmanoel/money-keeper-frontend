import { type ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

export const Button = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  position: fixed;
  cursor: pointer;
  bottom: 81px;
  right: 42px;
  border-radius: 32px;
  color: #cccccc;
  font-size: 20px;
  padding: 16px 24px;
  border: none;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(170deg, rgba(79,2,145,1) 32%, rgba(98,22,173,1) 56%, rgba(166,108,249,1) 100%);
  ${({ disabled = false }) => disabled
    ? css`
    background: #606060;
    `
    : css`background: linear-gradient(170deg, rgba(79,2,145,1) 32%, rgba(98,22,173,1) 56%, rgba(166,108,249,1) 100%);`}

`
