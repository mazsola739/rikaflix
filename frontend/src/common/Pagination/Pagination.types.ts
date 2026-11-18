export interface PaginationProps {
  currentPage: number
  totalPages: number
  paginate: (page: number) => void
}
