import styled from 'styled-components'

export const PaginationContainer = styled.div`
  height: 3rem;
  width: 65%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;

  span {
    font-size: 0.8rem;
  }
`

export const PaginationButton = styled.button`
  background: none;
  border: 1px solid #000;
  border-radius: 0.4rem;
  border-bottom: 0.3rem solid #000;
  cursor: pointer;
  font-size: 1rem;
  color: #000;
  padding: 0 0.8rem;
  height: 1.8rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #ffbf54;
    border-color: #ffbf54;
  }
`

export const PaginationInput = styled.input`
  font-family: 'AtypDisplay-Medium', sans-serif;
  font-size: 0.8rem;
  outline: 0;
  border: 1px solid #000;
  height: 2rem;
  padding: 1 2rem;
  border-radius: 0.4rem;
  width: 2.2rem;
  text-align: center;
`
