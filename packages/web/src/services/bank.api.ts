import axios, { AxiosError } from 'axios'

const axiosGateway = axios.create({
  baseURL: 'http://localhost:4000/api/v1'
})

export async function createAccount(data: any) {
  try {
    const result = await axiosGateway.post('/users', data)
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
