export interface Paginated<T> {
  items: T[];
  total: number;
  totalPages: number;
}
