import styled from 'styled-components'
import { ArrowCircleRight } from '@styled-icons/evaicons-solid'
import { ArrowUpRightCircle } from '@styled-icons/bootstrap'
import { Plus } from '@styled-icons/evil'

export const HomeContainer = styled.main`
  max-width: 1120px;
  padding: 0 1rem;
  margin: 0 auto;

  .send-money {
    grid-area: send-money;
  }

  .receive-money {
    grid-area: receive-money;
  }

  .cashback {
    grid-area: cashback;
  }

  img {
    width: 50%;
  }
`

export const FirstContainer = styled.div`
  width: 100%;
  height: 14rem;
  display: flex;
  justify-content: space-between;
`

export const FirstContainerMainTextWrapper = styled.div`
  width: 65%;
`

export const FirstContainerMainText = styled.h1`
  font-size: 6.4rem;
  color: #050724;
  line-height: 5rem;
`

export const OpenAccountContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const OpenAccountText = styled.span`
  font-size: 1.1rem;
  margin-bottom: 1.6rem;
  width: 85%;
`

export const ButtonAndTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

export const OpenAccountButton = styled.button`
  font-size: 1rem;
  background: #181a22;
  color: #f0f0f1;
  border-radius: 0.6rem;
  padding: 1.2rem 1.6rem;
  border: none;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`

export const DownloadAppContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  justify-content: space-between;
`

export const DownloadAppText = styled.span`
  font-size: 1rem;
  font-weight: 500;
`

export const ArrowCircleRightIcon = styled(ArrowCircleRight)`
  color: #181a22;
  width: 2rem;
  height: 2rem;
`

export const FeaturesContainer = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 65% 30%;
  grid-template-areas:
    'latest-updates send-money'
    'latest-updates receive-money'
    'latest-updates cashback';
  max-width: 100%;
  gap: 5%;
  height: 27rem;
`

export const LatestUpdatesCard = styled.div`
  grid-area: latest-updates;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 2rem 2rem;
  border: 2px solid #181a22;
  border-bottom: 1rem solid #181a22;
  border-radius: 2rem;
  max-height: 29rem;
`

export const LatestUpdatesTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 500;
`

export const ReceiveMoneyTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 500;
`

export const CashbackTitle = styled.h1`
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

export const LatestUpdatesContentTitleWrapper = styled.div`
  width: 80%;
`

export const LatestUpdatesContentTitle = styled.span`
  font-size: 1.4rem;
`

export const LatestUpdatesContentText = styled.span`
  font-size: 1rem;
  color: #1c1d23;
  font-weight: 500;
`

export const LatestUpdatesContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const ReadMoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

export const ArrowUpRightCircleIcon = styled(ArrowUpRightCircle)`
  color: #181a22;
  width: 1.6rem;
  height: 1.6rem;
`

export const ReadMoreText = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
`

export const LatestUpdatesContentTextWrapper = styled.div`
  margin-bottom: 1.2rem;
`

export const SmallFeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  border: 2px solid #181a22;
  border-bottom: 1rem solid #181a22;
  border-radius: 2rem;
  max-height: 8rem;
`

export const SendMoneyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SmallFeatureText = styled.h1`
  font-size: 1.8rem;
  font-weight: 500;
`

export const PlusIcon = styled(Plus)`
  color: #181a22;
  width: 4rem;
  height: 4rem;
`
