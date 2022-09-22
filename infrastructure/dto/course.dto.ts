export interface CourseDto {
  id: number,
  categories: Array<number>,
  status: string,
  excerpt: {
    rendered: string,
    raw: string
  },
  thumbnail_url:string,
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
  date: string | Date
}