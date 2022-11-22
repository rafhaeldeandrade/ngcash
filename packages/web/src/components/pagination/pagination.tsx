import React from 'react'
import {
  PaginationButton,
  PaginationContainer,
  PaginationInput
} from './styles'

interface PaginationProps {
  currentPage: number
  maxPages: number
  setCurrentPage: (page: number) => void
}

export function Pagination({
  currentPage,
  maxPages,
  setCurrentPage
}: PaginationProps) {
  function handleLeftBtn() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function handleRightBtn() {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value)
    if (value > 0 && value <= maxPages) {
      setCurrentPage(value)
      return
    }

    if (value > maxPages) {
      setCurrentPage(maxPages)
      return
    }

    setCurrentPage(1)
  }

  return (
    <PaginationContainer>
      <PaginationButton onClick={handleLeftBtn}>{'<'}</PaginationButton>
      <PaginationInput
        maxLength={3}
        value={currentPage}
        onChange={handleOnChange}
        type="number"
      />
      <span>de {maxPages}</span>
      <PaginationButton onClick={handleRightBtn}>{'>'}</PaginationButton>
    </PaginationContainer>
  )
}
