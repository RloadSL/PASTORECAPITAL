export interface PostDto {
  id: number,
  formatted_categories: WpCat[],
  formatted_tags: WpTerm[],
  lessons?: any[],
  status: string,
  created_by?:{username: string, uid: string, name: string},
  acf:Array<any>,
  

  excerpt: {
    rendered: string,
    raw: string
  },
  thumbnail_url: string,
  content?: {
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
  date: string | Date
}

export interface WpCat {
  name: 'Básico' | 'Avanzado' | 'Intermedio',
  slug: 'basic' | 'advanced' | 'medium',
  term_id?: number
}

export interface WpTerm {
  files: string | false
  id: number
  lesson_number: number
  slug: string
  title: string
}