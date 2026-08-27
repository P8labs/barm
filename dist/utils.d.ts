export declare function capitalize(value: string): string;
export type Pagination = {
    page: number;
    limit: number;
};
export declare function getPagination(query: Record<string, string | undefined> | undefined): Pagination;
export declare function getBody(body: unknown): Record<string, any>;
//# sourceMappingURL=utils.d.ts.map