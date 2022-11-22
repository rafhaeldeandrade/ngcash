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
  SignupContainer
} from './styles'
import { createAccount } from '../../services/bank.api'
import { setCookies } from '../../services/cookies'

export function SignUp() {
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
    const result = await createAccount(data)
    if (result?.statusCode === 201) {
      cleanInput()
      setCookies({
        username: data.username,
        accessToken: result.accessToken
      })
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
    if (result?.statusCode === 409) {
      cleanInputErrors()
      setUsernameError('Username already exists')
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
    <SignupContainer>
      <ImageSideWrapper>
        <ImageSide>
          <img src={CreateAccountImage} alt="random" />
        </ImageSide>
      </ImageSideWrapper>
      <FormSideWrapper>
        <FormSide>
          <FormSideText>Create your account</FormSideText>
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
              <input type="submit" />
              <LightText>
                Already have an account? <Link to="/login">Login</Link>
              </LightText>
            </>
          </Form>
        </FormSide>
      </FormSideWrapper>
    </SignupContainer>
  )
}
