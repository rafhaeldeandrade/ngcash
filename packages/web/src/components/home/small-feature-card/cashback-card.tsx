import React from 'react'
import {
  PlusIcon,
  SmallFeatureTitleWrapper,
  SmallFeatureCardContainer,
  SmallFeatureText,
  MinusIcon,
  SmallFeatureOpenText
} from './styles'

interface CashbackCardProps {
  isOpen: boolean
  handleOnClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function CashbackCard({ isOpen, handleOnClick }: CashbackCardProps) {
  return (
    <SmallFeatureCardContainer
      id="cashback"
      className="cashback"
      onClick={handleOnClick}
      open={isOpen}
    >
      <SmallFeatureTitleWrapper>
        <SmallFeatureText>Cashback</SmallFeatureText>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </SmallFeatureTitleWrapper>
      {isOpen && (
        <SmallFeatureOpenText>
          The way it works is simple: every time you shop on one of our partner
          websites, we&apos;ll automatically credit your LoremIpsum account with
          some amount. You can then use this money to redeem offers from our
          partner brands or use it to buy other products through the sites where
          you shopped.
        </SmallFeatureOpenText>
      )}
    </SmallFeatureCardContainer>
  )
}
