import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../assets/logo'
import { useAuth } from '../../hooks/auth'
import { getUsername } from '../../services/cookies'
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
  const { authed, logout } = useAuth()
  const navigate = useNavigate()

  function handleSignupBtnClick() {
    navigate('/signup')
  }

  function handleLoginBtnClick() {
    navigate('/login')
  }

  const username = getUsername()

  function handleLogout() {
    logout()
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
        {authed ? (
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
