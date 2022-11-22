import { Logo } from '../../assets/logo'
import {
  AccountWrapper,
  HeaderItem,
  NavigationWrapper,
  SignUpButton,
  StyledHeader
} from './styles'

export function Header() {
  return (
    <StyledHeader>
      <NavigationWrapper>
        <Logo />
        <HeaderItem>Our products</HeaderItem>
        <HeaderItem>Pricing</HeaderItem>
        <HeaderItem>Blog</HeaderItem>
      </NavigationWrapper>
      <AccountWrapper>
        <HeaderItem>Log in</HeaderItem>
        <SignUpButton>Sign up</SignUpButton>
      </AccountWrapper>
    </StyledHeader>
  )
}
