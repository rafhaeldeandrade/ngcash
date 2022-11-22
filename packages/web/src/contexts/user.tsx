import React, { createContext, ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccessToken, removeAllCookies } from '../services/cookies'

interface UserContextProviderProps {
  children: ReactNode
}

interface ContextProps {
  isLoggedIn: boolean
  isUserLoggedIn: () => void
  logoutUser: () => void
}

const UserContext = createContext({} as ContextProps)
export function UserContextProvider({ children }: UserContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const navigate = useNavigate()

  function isUserLoggedIn() {
    const accessToken = getAccessToken()
    if (accessToken) {
      setIsLoggedIn(true)
      return
    }
    setIsLoggedIn(false)
  }

  function logoutUser() {
    removeAllCookies()
    navigate('/')
  }

  useEffect(() => {
    isUserLoggedIn()
  }, [])

  const value = {
    isLoggedIn,
    isUserLoggedIn,
    logoutUser
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUserContext() {
  const user = useContext(UserContext)
  if (!user) {
    throw new Error('UserContext must be used within a UserContextProvider')
  }
  return user
}
