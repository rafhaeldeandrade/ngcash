import styled from 'styled-components'

export const SignupContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  a {
    text-decoration: none;
    color: #000;
  }
`

export const ImageSideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: #fff;
`

export const ImageSide = styled.div`
  width: 80%;
`

export const FormSideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`

export const FormSide = styled.div`
  width: 50%;
`

export const FormSideText = styled.h1`
  font-size: 2rem;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 1rem;
    border-radius: 0.4rem;
    outline: 0;
    border: 1px solid #ccc;
    padding: 1rem;
    font-size: 1rem;
  }

  input[type='submit'] {
    background-color: #000;
    color: #fff;
    border: 0;
    cursor: pointer;
    padding: 1rem;

    &:hover {
      filter: brightness(0.9);
    }
  }
`

export const ErrorText = styled.span`
  color: red;
  margin-bottom: 0.8rem;
`

export const LightText = styled.span`
  color: #837f7f;
  font-size: 1rem;
`
