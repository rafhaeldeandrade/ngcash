import styled from 'styled-components'
import { ArrowUpRightCircle } from '@styled-icons/bootstrap'

export const LatestUpdatesCardContainer = styled.div`
  grid-area: latest-updates;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 2rem 2rem;
  border: 2px solid #181a22;
  border-bottom: 1rem solid #181a22;
  border-radius: 2rem;
  max-height: 27rem;
`

export const LatestUpdatesTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 500;
`

export const Separator = styled.div`
  width: 100%;
  height: 3px;
  margin: 0 auto;
  background: #181a22;
`

export const LatestUpdatesContent = styled.div`
  margin-top: 2.2rem;
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
`

export const LatestUpdatesContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const LatestUpdatesContentTitleWrapper = styled.div`
  width: 80%;
`

export const LatestUpdatesContentTitle = styled.span`
  font-size: 1.4rem;
`

export const LatestUpdatesContentTextWrapper = styled.div`
  margin-bottom: 1.2rem;
`

export const LatestUpdatesContentText = styled.span`
  font-size: 1rem;
  color: #1c1d23;
  font-weight: 500;
`

export const ReadMoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

export const ReadMoreText = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
`

export const ArrowUpRightCircleIcon = styled(ArrowUpRightCircle)`
  color: #181a22;
  width: 1.6rem;
  height: 1.6rem;
`
