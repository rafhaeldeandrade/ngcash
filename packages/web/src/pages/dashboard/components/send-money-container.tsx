import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Form, SendMoneyContainer } from '../styles'

export function SendMoneyCard() {
  const { register, handleSubmit, control } = useForm({
    mode: 'onChange'
  })

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

  async function addTransaction(data: any) {
    console.log(data)
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
        />
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
            ></MaskedInput>
          )}
        />
        <input type="submit" />
      </Form>
    </SendMoneyContainer>
  )
}
