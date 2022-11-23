import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Header } from '../../components/header/header'
import {
  HomeContainer,
  FirstContainer,
  FirstContainerMainText,
  OpenAccountContainer,
  OpenAccountText,
  OpenAccountButton,
  ButtonAndTextContainer,
  DownloadAppText,
  DownloadAppContainer,
  ArrowCircleRightIcon,
  FirstContainerMainTextWrapper,
  FeaturesContainer
} from './styles'
import { SendMoneyCard } from '../../components/home/small-feature-card/send-money-card'
import { ReceiveMoneyCard } from '../../components/home/small-feature-card/receive-money-card'
import { CashbackCard } from '../../components/home/small-feature-card/cashback-card'
import { LatestUpdatesCard } from '../../components/home/latest-updates-card'
import { useAuth } from '../../hooks/auth'

export function Home() {
  const [openFeaturesCard, setOpenFeaturesCard] = useState({
    sendMoney: false,
    receiveMoney: false,
    cashback: false
  })
  const navigate = useNavigate()
  const { authed } = useAuth()

  function handleOnclick(e: React.MouseEvent<HTMLDivElement>) {
    const { id } = e.target as HTMLDivElement
    setOpenFeaturesCard((prevState) => ({
      ...openFeaturesCard,
      [id]: !prevState[id as keyof typeof openFeaturesCard]
    }))
  }

  function handleCallToAction() {
    navigate('/signup')
  }

  useEffect(() => {
    if (authed) navigate('/dashboard')
  })

  return (
    <>
      <Header />
      <HomeContainer>
        <FirstContainer>
          <FirstContainerMainTextWrapper>
            <FirstContainerMainText>
              Bank that is always online
            </FirstContainerMainText>
          </FirstContainerMainTextWrapper>
          <OpenAccountContainer>
            <OpenAccountText>
              You can easily access your bank account balance on your mobile
              phone whenever you want to.
            </OpenAccountText>
            <ButtonAndTextContainer>
              <OpenAccountButton onClick={handleCallToAction}>
                Open an account
              </OpenAccountButton>
              <DownloadAppContainer>
                <ArrowCircleRightIcon />
                <DownloadAppText>Get the app</DownloadAppText>
              </DownloadAppContainer>
            </ButtonAndTextContainer>
          </OpenAccountContainer>
        </FirstContainer>
        <FeaturesContainer>
          <LatestUpdatesCard />
          <SendMoneyCard
            handleOnClick={handleOnclick}
            isOpen={openFeaturesCard.sendMoney}
          />
          <ReceiveMoneyCard
            handleOnClick={handleOnclick}
            isOpen={openFeaturesCard.receiveMoney}
          />
          <CashbackCard
            handleOnClick={handleOnclick}
            isOpen={openFeaturesCard.cashback}
          />
        </FeaturesContainer>
      </HomeContainer>
    </>
  )
}
