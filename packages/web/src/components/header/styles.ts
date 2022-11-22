import styled from 'styled-components'

export const StyledHeader = styled.header`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1rem 1rem 1rem;
  display: flex;
  align-items: center;
`

export const HeaderItem = styled.span`
  color: #050724;
  cursor: pointer;
  padding: 0.4rem;
  font-size: 1rem;
`

export const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

export const AccountWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`

export const SignUpButton = styled.button`
  font-size: 1rem;
  margin-left: 0.8rem;
  border-radius: 0.6rem;
  height: 3rem;
  padding: 0 1.6rem;
  background: #fff;
  outline: 0;
  border: 1px solid #050724;
  color: #050724;

  &:hover {
    filter: brightness(0.97);
    cursor: pointer;
  }
`

export const SmallText = styled.span`
  font-size: 1rem;
  color: #050724;
`

export const LogoutText = styled.span`
  font-size: 0.8rem;
  margin-left: 1.6rem;
  cursor: pointer;
`
