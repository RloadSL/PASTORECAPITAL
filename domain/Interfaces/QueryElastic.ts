export interface QueryElastic {
  paginator?: { from: number, size: number }
  query?: { match: { data: any } }
  sort?: any[]
}