import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../assets/logo'
import {
  AccountWrapper,
  HeaderItem,
  NavigationWrapper,
  SignUpButton,
  StyledHeader
} from './styles'

export function Header() {
  const navigate = useNavigate()

  function handleSignupBtnClick() {
    navigate('/signup')
  }

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
        <SignUpButton onClick={handleSignupBtnClick}>Sign up</SignUpButton>
      </AccountWrapper>
    </StyledHeader>
  )
}
