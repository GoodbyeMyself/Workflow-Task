import type { ButtonHTMLAttributes } from 'react'

type IBasePaginationProps = {
  currentPage: number
  setCurrentPage: (page: number) => void
  truncableText?: string
  truncableClassName?: string
}

type IPaginationProps = IBasePaginationProps & {
  totalPages: number
  edgePageCount: number
  middlePagesSiblingCount: number
  className?: string
  children?: React.ReactNode
}

type IUsePagination = IBasePaginationProps & {
  pages: number[]
  hasPreviousPage: boolean
  hasNextPage: boolean
  previousPages: number[]
  isPreviousTruncable: boolean
  middlePages: number[]
  isNextTruncable: boolean
  nextPages: number[]
}

type IPagination = IUsePagination & {
  setCurrentPage: (page: number) => void
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: React.ReactNode
  children?: string | React.ReactNode
  className?: string
  dataTestId?: string
}

type PageButtonProps = ButtonProps & {
  /**
   * 提供自定义组件（如 umi 的 Link 组件），支持 to 属性
   */
  as?: React.ElementType
  activeClassName?: string
  inactiveClassName?: string
  dataTestIdActive?: string
  dataTestIdInactive?: string
  renderExtraProps?: (pageNum: number) => {}
}

export type {
  IPaginationProps,
  IUsePagination,
  IPagination,
  ButtonProps,
  PageButtonProps,
}
