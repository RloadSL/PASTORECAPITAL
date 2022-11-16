export interface PostDto {
  /**
   * Identificador
   */
  id: number,
  /**
   * Categorias relacionadas
   */
  formatted_categories: WpCat[],
  /**
   * Tags del post
   */
  formatted_tags: WpTerm[],
  /**
   * Lecciones si es un curso
   */
  lessons?: any[],
  /**
   * Estado del post en el headless
   */
  status: string,
  /**
   * Usuario de firebase que ha creado el post
   */
  created_by?: { username: string, uid: string, name: string },
  /**
   * Meta boxes del ACF plugin
   */
  acf: Array<any>, 
  /**
   * Estracto o resumen
   */
  excerpt: {
    rendered: string,
    raw: string
  },
  /**
   * Imagen destacada del post
   */
  thumbnail_url: string,
  /**
   * Contenido
   */
  content?: {
    rendered: string,
    raw: string
  },
  /**
   * El slug del post
   */
  slug: string,
  /**
   * Titulo
   */
  title: {
    rendered: string,
    raw: string
  },
  /**
   * ISO Date convertir a new Date
   */
  date: string | Date,
  /**
   * Metas del post
   */
  metas?: any,
}

export interface WpCat {
  name: string,
  slug: string,
  parent: WpCat | 0,
  term_id?: number
}

export interface WpTerm {
  files: string | false
  id: number
  lesson_number: number
  slug: string
  title: string
}