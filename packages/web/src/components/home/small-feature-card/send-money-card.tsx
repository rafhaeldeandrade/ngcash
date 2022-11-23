import React from 'react'
import {
  PlusIcon,
  SmallFeatureTitleWrapper,
  SmallFeatureCardContainer,
  SmallFeatureText,
  MinusIcon,
  SmallFeatureOpenText
} from './styles'

interface SmallFeatureCardProps {
  isOpen: boolean
  handleOnClick: (
    event: React.MouseEvent<HTMLDivElement>
  ) => void | (() => void)
}

export function SendMoneyCard({
  isOpen,
  handleOnClick
}: SmallFeatureCardProps) {
  return (
    <SmallFeatureCardContainer
      id="sendMoney"
      className="send-money"
      onClick={handleOnClick}
      open={isOpen}
    >
      <SmallFeatureTitleWrapper>
        <SmallFeatureText>Send money</SmallFeatureText>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </SmallFeatureTitleWrapper>
      {isOpen && (
        <SmallFeatureOpenText>
          LoremIpsum is a digital wallet that allows you to securely send and
          receive money through mobile devices. It&apos;s an ideal solution for
          people who want to send or receive money from friends, family or
          colleagues at any time of the day or night.
        </SmallFeatureOpenText>
      )}
    </SmallFeatureCardContainer>
  )
}
