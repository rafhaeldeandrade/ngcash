import styled from 'styled-components'

export const DashboardContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`

export const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;
`

export const Balance = styled.span`
  margin-left: 0.6rem;
  font-size: 1.4rem;
  font-weight: 500;
`

export const DashboardContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const DashboardCards = styled.div`
  display: grid;
  grid-template-columns: 68% 28%;
  grid-template-areas:
    'transactions send-money'
    'transactions receive-money';
  max-width: 100%;
  gap: 5%;
`

export const TransactionsCardContainer = styled.div`
  grid-area: transactions;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 2rem 2rem;
  border: 2px solid #181a22;
  border-bottom: 1rem solid #181a22;
  border-radius: 2rem;
  min-height: 38rem;
`

export const TransactionsCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

export const FilterItem = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  padding: 0.2rem 0.4rem;
  cursor: pointer;
`

export const TransactionsTable = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 18rem;
`

export const TransactionsTableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.2rem 0.4rem;
`

export const TransactionsTableHeaderItem = styled.span`
  width: 25%;
  font-size: 1.1rem;
  text-align: center;
`

export const TransactionsTableRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.2rem 0.4rem;
`

export const TransactionsTableRowItem = styled.span`
  width: 25%;
  font-size: 0.8rem;
  text-align: center;
`

export const SendMoneyContainer = styled.div`
  grid-area: send-money;
  min-height: 26rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 2rem 2rem;
  border: 2px solid #181a22;
  border-bottom: 1rem solid #181a22;
  border-radius: 2rem;
`

export const Input = styled.input`
  margin-bottom: 1rem;
  border-radius: 0.4rem;
  outline: 0;
  border: 1px solid #ccc;
  padding: 1rem;
  font-size: 1rem;
`

export const SendMoneyButton = styled.input`
  margin-top: 1rem;
  border-radius: 0.4rem;
  outline: 0;
  border: 0;
  padding: 1rem;
  font-size: 1rem;
  background: #181a22;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ffbf54;
    color: #181a22;
  }
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
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #ffbf54;
      color: #181a22;
    }
  }
`

export const ErrorText = styled.span`
  color: red;
  margin-bottom: 0.8rem;
  text-align: center;
`

export const SuccessText = styled.span`
  color: green;
  text-align: center;
  margin-bottom: 0.8rem;
`

export const DatepickerWrapper = styled.div`
  max-width: 5rem;
`
