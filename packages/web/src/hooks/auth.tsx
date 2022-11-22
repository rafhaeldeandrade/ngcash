import React, { createContext, ReactNode, useContext, useState } from 'react'
import { getAccessToken } from '../services/cookies'

const authContext = createContext({})

function isLoggedIn() {
  const accessToken = getAccessToken()
  if (accessToken) return true
  return false
}

export function useAuth() {
  const [authed, setAuthed] = useState(isLoggedIn())

  return {
    authed,
    login() {
      setAuthed(true)
    },
    logout() {
      setAuthed(false)
    }
  }
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export default function AuthConsumer() {
  return useContext(authContext)
}
