import React from 'react'
import {
  LatestUpdatesCardContainer,
  ArrowUpRightCircleIcon,
  LatestUpdatesContent,
  LatestUpdatesContentText,
  LatestUpdatesContentTextWrapper,
  LatestUpdatesContentTitle,
  LatestUpdatesContentTitleWrapper,
  LatestUpdatesContentWrapper,
  LatestUpdatesTitle,
  ReadMoreContainer,
  ReadMoreText,
  Separator
} from './styles'
import CreditCardImage from '../../assets/credit-card-cropped.png'

export function LatestUpdatesCard() {
  return (
    <LatestUpdatesCardContainer>
      <LatestUpdatesTitle>Latest updates</LatestUpdatesTitle>
      <Separator />
      <LatestUpdatesContent>
        <LatestUpdatesContentWrapper>
          <LatestUpdatesContentTitleWrapper>
            <LatestUpdatesContentTitle>
              Connecting cards from other banks
            </LatestUpdatesContentTitle>
          </LatestUpdatesContentTitleWrapper>
          <LatestUpdatesContentTextWrapper>
            <LatestUpdatesContentText>
              Now all your accounts have the function of connecting cards from
              other banks. Managing your finances has never been easier.
            </LatestUpdatesContentText>
          </LatestUpdatesContentTextWrapper>
          <ReadMoreContainer>
            <ArrowUpRightCircleIcon />
            <ReadMoreText>Read full version</ReadMoreText>
          </ReadMoreContainer>
        </LatestUpdatesContentWrapper>
        <img src={CreditCardImage} alt="Credit card" />
      </LatestUpdatesContent>
    </LatestUpdatesCardContainer>
  )
}
