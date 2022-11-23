import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { sendMoney } from '../../../services/bank.api'
import { ErrorText, Form, SendMoneyContainer, SuccessText } from '../styles'

export function SendMoneyCard() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange'
  })
  const [usernameError, setUsernameError] = useState('')
  const [amountError, setAmountError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const defaultMaskOptions = {
    prefix: 'R$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2,
    integerLimit: 9,
    allowNegative: false,
    allowLeadingZeroes: false
  }

  const currencyMask = createNumberMask({
    ...defaultMaskOptions
  })

  const registerOptions = {
    usernameToCashIn: {
      required: 'Username is required',
      minLength: {
        value: 3,
        message: 'Username must be at least 3 characters'
      }
    },
    amount: {
      required: 'Amount is required',
      minLength: {
        value: 3,
        message: 'Amount must be at least 3 characters'
      }
    }
  }

  function cleanInputErrors() {
    setUsernameError('')
    setAmountError('')
    setSuccessMessage('')
  }

  function cleanInputs() {
    reset({
      usernameToCashIn: '',
      amount: ''
    })
  }

  async function addTransaction(data: any) {
    const result = await sendMoney(data)
    if (result?.statusCode === 201) {
      cleanInputErrors()
      cleanInputs()
      setSuccessMessage('Money sent successfully')
    }
    if (result?.error === 'Balance is not enough') {
      cleanInputErrors()
      setAmountError('Balance is not enough')
    }
    if (result?.error === 'User not found') {
      cleanInputErrors()
      setUsernameError('User not found')
    }
    if (result?.error === 'User not authorized') {
      cleanInputErrors()
      setUsernameError('You cannot send money to yourself')
    }
  }

  return (
    <SendMoneyContainer>
      <h1>Send money to</h1>
      <Form onSubmit={handleSubmit(addTransaction)}>
        <label htmlFor="usernameToCashIn">Username</label>
        <input
          id="usernameToCashIn"
          {...register('usernameToCashIn', registerOptions.usernameToCashIn)}
          type="text"
          placeholder="Username"
          onBlur={cleanInputErrors}
        />
        {errors?.usernameToCashIn && (
          <ErrorText>
            <>{errors.usernameToCashIn.message}</>
          </ErrorText>
        )}
        {usernameError && <ErrorText>{usernameError}</ErrorText>}
        <label htmlFor="amount">Amount</label>
        <Controller
          name="amount"
          control={control}
          defaultValue="10"
          render={({ field: { onChange, value } }) => (
            <MaskedInput
              mask={currencyMask}
              value={value}
              onChange={onChange}
              onBlur={cleanInputErrors}
            ></MaskedInput>
          )}
        />
        {errors?.amount && (
          <ErrorText>
            <>{errors.amount.message}</>
          </ErrorText>
        )}
        {amountError && <ErrorText>{amountError}</ErrorText>}
        <input type="submit" />
        {successMessage && <SuccessText>{successMessage}</SuccessText>}
      </Form>
    </SendMoneyContainer>
  )
}
