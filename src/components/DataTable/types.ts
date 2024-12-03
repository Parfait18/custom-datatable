export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  visible?: boolean;
}

export type SortOrder = 'asc' | 'desc';

export type ExportFormat = 'csv' | 'json' | 'txt' | 'sql';

export interface SortConfig {
  key: string;
  order: SortOrder;
}

export interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  pagination?: boolean;
  initialSort?: SortConfig;
  searchableFields?: string[];
  rowSizes?: number[];
  tableName?: string;
  selectable?: boolean;
}

export interface PaginationProps {
  currentPage: number;
  perPage: number;
  total: number;
  pageSizes?: number[];
}

export interface SelectedRows {
  [key: string]: boolean;
}