import styled, { css } from 'styled-components'

export const MainContainer = styled.div`
  margin: 0;
  background: #eeeee;
  padding: 32px 16px;
  padding-bottom: 80px;
`

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
`

export const FilterContainer = styled.div`
  padding: 16px 0;
  text-align: center;
`

export const DirectionContainer = styled.div`
  width: 100%;
`

interface ButtonProps {
  active: boolean
  side: 'left' | 'right'
}
export const DirectionItem = styled.button<ButtonProps>`
  background: #c0c0c0;
  border-radius: 24px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 24px;
  position: relative;
  transition: background .3s;
  text-decoration: none;
  width: 50%;
  z-index: 2;

  ${({ active, side }) => active
    ? css`
      background: linear-gradient(170deg, rgba(79,2,145,1) 32%, rgba(98,22,173,1) 56%, rgba(166,108,249,1) 100%);
      color: white;
      cursor: normal;
    `
    : css`
      border-radius: ${() => side === 'left' ? '24px 0 0 24px' : '0 24px 24px 0'};
      padding: ${() => side === 'left' ? '24px 32px 24px 24px !important' : '24px 24px 24px 32px !important'};
      margin: ${() => side === 'left' ? '0 -16px 0 0' : '0 0 0 -16px'};
      z-index: 1;
      color: #333;

      &:hover {
        box-shadow: 0 0 40px #fff inset;
      }
    `
}
`

export const BodyContent = styled.div`
  padding: 20px;
  padding-top: 0;
`

export const ResumeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 0;
`

export const ResumeItem = styled.div`
  display: flex;
  flex-direction: column;
`

export const ResumeLabel = styled.span`
  font-size: 16px;
  color: #333;
  padding: 8px 0;
`

export const ResumeValue = styled.span`
  font-size: 24px;
  font-weight: bold;
`

export const SkeletonsListTitle = styled.h4``

export const SkeletonsList = styled.div``

export const SkeletonItem = styled.button`
  background: #eee;
  border-radius: 16px;
  border: none;
  box-shadow: 4px 4px 8px #666;
  color: #333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
  padding: 16px;
  width: 100%;
`

export const SkeletonColumn = styled.div``

export const SkeletonTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
`

export const SkeletonValue = styled.div`
  font-weight: bold;
  font-size: 18px;
`

export const SkeletonFrequency = styled.div`
  text-align: right;
  font-size: 12px;
  color: #666;
`

export const SkeletonCreated = styled.div`
  font-size: 12px;
  text-align: left;
  color: #666;
`
