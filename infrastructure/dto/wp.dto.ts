export interface CATEGORY {
  /**
   * Nombre de la categoria a crear en wp
   */
  name : string,
  description?: string,
  slug?: string,
  /**
   * El parent term ID
   */
  parent?: string,
  meta? : any
}

export interface PAGES {
  /**
   * Titulo de la página
   */
  title: string,
  /**
   * Descripcción breve de la página. 
   */
  excerpt : string,
  /**
   * id de las categorias separadas por coma "12,20,30".
   */
  level?: any
}