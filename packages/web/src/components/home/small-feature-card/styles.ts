import styled from 'styled-components'
import { Plus, Minus } from '@styled-icons/evil'

export const SmallFeatureCardContainer = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ open }) => (open ? '1.6rem 2rem' : '1rem 2rem')};
  border: 2px solid #181a22;
  border-bottom: 1rem solid #181a22;
  border-radius: 2rem;
  cursor: pointer;

  background-color: ${({ open }) => (open ? '#ffbf54' : '#f7f6f7')};
`

export const SmallFeatureTitleWrapper = styled.div`
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SmallFeatureText = styled.h1`
  pointer-events: none;
  font-size: 1.6rem;
  font-weight: 500;
`

export const PlusIcon = styled(Plus)`
  pointer-events: none;
  color: #181a22;
  width: 4rem;
  height: 4rem;
`

export const MinusIcon = styled(Minus)`
  pointer-events: none;
  color: #181a22;
  width: 4rem;
  height: 4rem;
`

export const SmallFeatureOpenText = styled.span`
  pointer-events: none;
  font-size: 1rem;
`
