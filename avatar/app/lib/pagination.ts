export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function getPaginationParams(searchParams: Record<string, string | string[] | undefined>) {
  let page = 1;
  let limit = 10;

  if (searchParams.page) {
    const p = Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page;
    page = Math.max(1, parseInt(p, 10) || 1);
  }

  if (searchParams.limit) {
    const l = Array.isArray(searchParams.limit) ? searchParams.limit[0] : searchParams.limit;
    limit = Math.max(1, Math.min(100, parseInt(l, 10) || 10));
  }

  return { page, limit };
}

export function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: items.slice(start, end),
    total,
    page: Math.min(page, totalPages || 1),
    limit,
    totalPages,
  };
}
