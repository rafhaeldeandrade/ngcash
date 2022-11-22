import React, { useState } from 'react'
import CreateAccountImage from '../../assets/create-account.svg'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  ErrorText,
  Form,
  FormSide,
  FormSideText,
  FormSideWrapper,
  ImageSide,
  ImageSideWrapper,
  LightText,
  LoginContainer
} from './styles'
import { authenticate } from '../../services/bank.api'
import { setCookies } from '../../services/cookies'
import { useAuth } from '../../hooks/auth'

export function Login() {
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange'
  })

  const { login } = useAuth()
  const navigate = useNavigate()

  function cleanInput() {
    reset({
      username: '',
      password: ''
    })
  }

  function cleanInputErrors() {
    setUsernameError('')
    setPasswordError('')
  }

  async function addAccount(data: any) {
    const result = await authenticate(data)
    if (result?.statusCode === 200) {
      cleanInput()
      setCookies({
        username: data.username,
        accessToken: result.accessToken,
        accountId: result.accountId
      })
      login()
      navigate('/dashboard')
    }
    if (result?.statusCode === 400) {
      cleanInputErrors()
      if (result.error.includes('username')) {
        setUsernameError(result.error)
        return
      }
      setPasswordError(
        'Password must have 8 characters and at least 1 uppercase, 1 lowercase, 1 number'
      )
    }
    if (result?.statusCode === 401) {
      cleanInputErrors()
      setUsernameError('Username or password is incorrect')
    }
    if (result?.statusCode === 500) {
      cleanInputErrors()
      setPasswordError('Something went wrong, try again later')
    }
  }

  const registerOptions = {
    username: {
      required: 'Username is required',
      minLength: {
        value: 3,
        message: 'Username must be at least 3 characters'
      }
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters'
      }
    }
  }

  return (
    <LoginContainer>
      <FormSideWrapper>
        <FormSide>
          <Link to="/">{'<'} Back to home page</Link>
          <FormSideText>Welcome back :)</FormSideText>
          <Form onSubmit={handleSubmit(addAccount)}>
            <>
              <label htmlFor="username">username</label>
              <input
                id="username"
                {...register('username', registerOptions.username)}
                type="text"
              />
              {errors?.username && (
                <ErrorText>
                  <>{errors.username.message}</>
                </ErrorText>
              )}
              {usernameError && <ErrorText>{usernameError}</ErrorText>}
              <label htmlFor="password">password</label>
              <input
                id="password"
                {...register('password', registerOptions.password)}
                type="password"
              />
              {errors?.password && (
                <ErrorText>
                  <>{errors.password.message}</>
                </ErrorText>
              )}
              {passwordError && <ErrorText>{passwordError}</ErrorText>}
              <input value="Log in" type="submit" />
              <LightText>
                Don&apos;t have an account yet?{' '}
                <Link to="/signup">Sign up</Link>
              </LightText>
            </>
          </Form>
        </FormSide>
      </FormSideWrapper>
      <ImageSideWrapper>
        <ImageSide>
          <img src={CreateAccountImage} alt="random" />
        </ImageSide>
      </ImageSideWrapper>
    </LoginContainer>
  )
}
