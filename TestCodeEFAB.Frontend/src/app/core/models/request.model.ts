export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}

export interface SearchRequestModel {
  sortField?: string;
  sortOrder?: 'asc' | 'desc' | '';
  searchText?: string;
}

export interface PageRequest extends SearchRequestModel {
  pageIndex: number;
  pageSize: number;
}
