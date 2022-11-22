import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../assets/logo'
import {
  getAccessToken,
  getUsername,
  removeAllCookies
} from '../../services/cookies'
import {
  AccountWrapper,
  HeaderItem,
  LogoutText,
  NavigationWrapper,
  SignUpButton,
  SmallText,
  StyledHeader
} from './styles'

export function Header() {
  const navigate = useNavigate()

  function handleSignupBtnClick() {
    navigate('/signup')
  }

  function handleLoginBtnClick() {
    navigate('/login')
  }

  function isUserLoggedIn() {
    const accessToken = getAccessToken()
    if (accessToken) {
      return true
    }
    return false
  }

  const username = getUsername()

  function handleLogout() {
    removeAllCookies()
    navigate('/')
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
        {isUserLoggedIn() ? (
          <>
            <SmallText>Hello, {username}</SmallText>
            <LogoutText onClick={handleLogout}>log out</LogoutText>
          </>
        ) : (
          <>
            <HeaderItem onClick={handleLoginBtnClick}>Log in</HeaderItem>
            <SignUpButton onClick={handleSignupBtnClick}>Sign up</SignUpButton>
          </>
        )}
      </AccountWrapper>
    </StyledHeader>
  )
}
