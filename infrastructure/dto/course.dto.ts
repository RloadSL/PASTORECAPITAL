export interface PostDto {
  id: number,
  categories:WpCat[],
  tags: WpTerm[],
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

export interface WpCat{
  name: 'Básico' | 'Avanzado' | 'Intermedio',
  slug: 'basic' | 'advanced' | 'medium',
  term_id?: number
}

export interface WpTerm {
  name: string,
  slug: string,
  term_id: number
}