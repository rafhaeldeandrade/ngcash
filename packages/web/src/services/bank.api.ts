import axios, { AxiosError } from 'axios'
import { getAccessToken, getAccountId } from './cookies'

const axiosGateway = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
})

interface AuthenticationData {
  username: string
  password: string
}

export async function createAccount(data: AuthenticationData) {
  const controller = new AbortController()
  try {
    const result = await axiosGateway.post('/users', data, {
      signal: controller.signal
    })
    return {
      accessToken: result?.data?.accessToken,
      statusCode: result?.status
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        error: e.response?.data.message,
        statusCode: e.response?.status
      }
    }
  }
}

export async function authenticate(data: AuthenticationData) {
  const controller = new AbortController()
  try {
    const result = await axiosGateway.post('/login', data, {
      signal: controller.signal
    })
    return {
      accessToken: result?.data?.accessToken,
      statusCode: result?.status,
      accountId: result?.data?.accountId
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        error: e.response?.data.message,
        statusCode: e.response?.status
      }
    }
  }
}

export async function getCurrentBalance() {
  const controller = new AbortController()
  const accessToken = getAccessToken()
  const accountId = getAccountId()
  try {
    const result = await axiosGateway.get(`/accounts/${accountId}`, {
      headers: {
        Authorization: accessToken
      },
      signal: controller.signal
    })
    return {
      balance: result?.data?.balance,
      statusCode: result?.status
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        error: e.response?.data.message,
        statusCode: e.response?.status
      }
    }
  }
}

interface GetTransactionsProps {
  type?: 'cashIn' | 'cashOut' | 'all'
  page?: number
}

export async function getTransactions({ type, page }: GetTransactionsProps) {
  const controller = new AbortController()
  const accessToken = getAccessToken()
  const transactionType = type || 'all'
  const pageNumber = page || 1

  try {
    const result = await axiosGateway.get(
      `/transactions/?page=${pageNumber}&transactionType=${transactionType}`,
      {
        headers: {
          Authorization: accessToken
        },
        signal: controller.signal
      }
    )
    return {
      transactions: result?.data?.transactions,
      totalTransactions: result?.data?.totalTransactions,
      statusCode: result?.status
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        error: e.response?.data.message,
        statusCode: e.response?.status
      }
    }
  }
}

interface SendMoneyProps {
  usernameToCashIn: string
  amount: string
}

export async function sendMoney({ usernameToCashIn, amount }: SendMoneyProps) {
  const controller = new AbortController()
  const accessToken = getAccessToken()
  const amountToSend = parseFloat(
    amount.replace('R$', '').replace('.', '').replace(',', '.').trim()
  )

  try {
    const result = await axiosGateway.post(
      `/transactions`,
      {
        usernameToCashIn,
        amount: amountToSend
      },
      {
        headers: {
          Authorization: accessToken
        },
        signal: controller.signal
      }
    )
    return {
      statusCode: result?.status
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        error: e.response?.data.message,
        statusCode: e.response?.status
      }
    }
  }
}
