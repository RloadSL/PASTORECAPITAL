export interface CourseDto {
  docID: string,
  wpID: number,
  categories: Array<number>,
  status: string,
  excerpt: {
    rendered: string,
    raw: string
  },
  content? : {
    rendered: string,
    raw: string
  },
  slug: string,
  title: {
    rendered: string,
    raw: string
  },
  /**
   * ISO Date convertir a new Date
   */
  created_at: string | Date
}