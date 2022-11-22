import React from 'react'
import {
  PlusIcon,
  SmallFeatureTitleWrapper,
  SmallFeatureCardContainer,
  SmallFeatureText,
  MinusIcon,
  SmallFeatureOpenText
} from './styles'

interface ReceiveMoneyCardProps {
  isOpen: boolean
  handleOnClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function ReceiveMoneyCard({
  isOpen,
  handleOnClick
}: ReceiveMoneyCardProps) {
  return (
    <SmallFeatureCardContainer
      id="receiveMoney"
      className="receive-money"
      onClick={handleOnClick}
      open={isOpen}
    >
      <SmallFeatureTitleWrapper>
        <SmallFeatureText>Receive money</SmallFeatureText>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </SmallFeatureTitleWrapper>
      {isOpen && (
        <SmallFeatureOpenText>
          LoremIpsum is a mobile banking service that helps people receive
          money. We are also working on a blockchain-based platform to help send
          money globally and create a global remittance network. We believe that
          this will revolutionize the way we send and receive money, as well as
          how we manage our finances.
        </SmallFeatureOpenText>
      )}
    </SmallFeatureCardContainer>
  )
}
