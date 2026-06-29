
import { useState } from 'react'
import {
  type ColumnDef, type ColumnFiltersState, type SortingState,
  type VisibilityState, flexRender, getCoreRowModel,
  getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SearchInput } from '@/components/shared/search-input'
import { EmptyState } from '@/components/shared/empty-state'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings2, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

function getPageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = [1]

  if (currentPage > 3) {
    pages.push('ellipsis')
  }

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (currentPage < totalPages - 2) {
    pages.push('ellipsis')
  }

  pages.push(totalPages)

  return pages
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  enableSelection?: boolean
  enablePagination?: boolean
  pageSize?: number
  filterContent?: React.ReactNode
  bulkActions?: React.ReactNode
}

export function DataTable<TData, TValue>({
  columns, data, searchKey, searchPlaceholder = 'Search...',
  enablePagination = true, pageSize = 10, filterContent, bulkActions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
    initialState: { pagination: { pageSize } },
  })

  const selectedCount = table.getFilteredSelectedRowModel().rows.length

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          {searchKey !== undefined && (
            <SearchInput
              value={globalFilter}
              onChange={setGlobalFilter}
              placeholder={searchPlaceholder}
            />
          )}
          {filterContent}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 h-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none">
            <Settings2 className="mr-2 h-4 w-4" />
            Columns
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {selectedCount > 0 && bulkActions && (
        <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-2">
          <span className="text-sm text-muted-foreground">
            {selectedCount} row(s) selected
          </span>
          {bulkActions}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyState
                    title="No results found"
                    description="Try adjusting your search or filters."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination && table.getPageCount() > 1 && (() => {
        const currentPage = table.getState().pagination.pageIndex + 1
        const totalPages = table.getPageCount()
        const totalRows = table.getFilteredRowModel().rows.length
        const from = table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1
        const to = Math.min(currentPage * table.getState().pagination.pageSize, totalRows)
        const pages = getPageNumbers(currentPage, totalPages)

        return (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {from}-{to} of {totalRows}
            </p>
            <div className="flex items-center gap-1">
              {/* First page */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              {/* Previous */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Page numbers */}
              {pages.map((page, i) =>
                page === 'ellipsis' ? (
                  <span key={`ellipsis-${i}`} className="flex h-8 w-8 items-center justify-center">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </span>
                ) : (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'default' : 'ghost'}
                    size="sm"
                    className={cn('h-8 w-8 p-0 text-xs', page === currentPage && 'pointer-events-none')}
                    onClick={() => table.setPageIndex(page - 1)}
                  >
                    {page}
                  </Button>
                )
              )}

              {/* Next */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              {/* Last page */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(totalPages - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
