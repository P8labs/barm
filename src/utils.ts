export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export type Pagination = {
  page: number;
  limit: number;
};

export function getPagination(
  query: Record<string, string | undefined> | undefined,
): Pagination {
  const page = Math.max(1, Number(query?.page ?? 1));

  const limit = Math.min(100, Math.max(1, Number(query?.limit ?? 20)));

  return {
    page,
    limit,
  };
}

export function getBody(body: unknown): Record<string, any> {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Request body must be an object");
  }

  return body as Record<string, any>;
}
