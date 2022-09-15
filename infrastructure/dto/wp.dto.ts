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