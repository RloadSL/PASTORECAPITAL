import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { Post } from "domain/Post/Post";
import { WP_TERM } from "infrastructure/dto/wp.dto";
import { HTTP } from "infrastructure/http/http";
import { WP_API_ANLALYSIS, WP_API_CATEGORY, WP_API_POST } from "infrastructure/wordpress/config";

export interface ANALYSIS_QUERY {
  post_status?: 'private' | 'publish' | 'public',
  posts_per_page?: number,
  offset?: number,
  /**
   * @description Buscador por string
   */
  s?: string,
  /**
   * @description Slug de la categoría
   */
  category_name?: string,
  tags?: number
}
/**
 * Servicios de análisis necesarios para su correcto funcionamiento implementado con el patron Singlenton
 */

export class AnalysisRepository {
  private static instance: AnalysisRepository;
  private constructor() { };

  public static getInstance(): AnalysisRepository {
    if (!AnalysisRepository.instance) {
      AnalysisRepository.instance = new AnalysisRepository();
    }
    return AnalysisRepository.instance;
  }
  /**
   * Actualiza o crea si no existe una subcategoría de análisis en el headless de wordpress
   * @param wpToken Token de seguridad de WP obtenido si eres colaborador o administrador 
   * @param category_args Argumentos de la categoría
   * @param id Id de la categoría si deseas modificar una ya existente
   * @returns Promise
   */
  setCategory = async (wpToken: string, category_args: { name: string, description?: string }, id?: number): Promise<any> => {
    /**
     * Categoría principal de análisis
     */
    const analysis_cat: WP_TERM = (await HTTP.get(`${WP_API_ANLALYSIS}category?only_analysis=1`))[0];
    //Comprobabos que existe la categoría principal en el WP
    if (!analysis_cat.term_id) return alert('No existe la categoria de analysis en la API de wp')
    /**
     * Argumentos necesarios para crear la categoría en el headless
     */
    const arg = {
      ...category_args,
      parent: analysis_cat.term_id
    }
    //Construimos la url y hacemos las llamdas apis al headless.
    /**
     * Url de la llamada a la API
     */
    const url = id ? WP_API_CATEGORY + `/${id}` : WP_API_CATEGORY
    const res = await HTTP.post(url, arg, HTTP.getHeaders(wpToken))
    return res.errCode ? new ErrorApp({ errorCode: 'api_wp@' + res.errCode, errorMessage: res.errCode }) : null;
  }
  /**
   * Elimina una subcategoría de análisis 
   * @param wpToken Token de seguridad de WP obtenido si eres colaborador o administrador 
   * @param id Id de la categoría
   * @returns Promise
   */
  deleteCategory = async (wpToken: string, id: number): Promise<any> => {
    //Construimos la url y hacemos las llamdas apis al headless.
    /**
     * Url de la llamada a la API
     */
    const res = await HTTP.delete(`${WP_API_ANLALYSIS}category/${id}`, HTTP.getHeaders(wpToken));
    return res.errCode ? new ErrorApp({ errorCode: 'api_wp@' + res.errCode, errorMessage: res.errCode }) : null;
  }
  /**
   * Devulve las categorias de análisis
   * @param data
   * @param data.only_analysis Obciones de la respuesta 
   * [0] => Devuelve todas las categorías incluyendo la principal |
   * [1] => Devuelve solo la principal |
   * [-1] => Devuelve todas las subcategorías de análisis
   * @returns Promise
   */
  getCategories = async ({ only_analysis }: { only_analysis: -1 | 0 | 1 } = { only_analysis: -1 }) => {
    const res = await HTTP.get(`${WP_API_ANLALYSIS}category?only_analysis=${only_analysis}`)
    if (Array.isArray(res)) {
      return res.map(term => {
        return {
          value: term.term_id,
          label: term.name,
          term: term
        }
      })
    } else {
      return {
        value: res.term_id,
        label: res.name,
        term: res
      }
    }
  }
  /**
   * Crea un artículo asignandola a una subcategoría de análisis 
   * @param categories ID de las categorias a las que se asignará este artículo
   * @param wpToken Token de seguridad de WP obtenido si eres colaborador o administrador 
   * @param article_args Argumentos necesarios para el artículo
   * @returns Promise
   */
  createArticle = async (categories: number[], wpToken: string, article_args: { title: string, excerpt?: string, created_by: any }): Promise<string | Post> => {
    /**
    * Categoría principal de análisis
    */
    const a_category = (await this.getCategories({ only_analysis: 1 })) as { label: string, value: any }[]
    //Es necesario siempre asignare la categoria principal de análisis para hacer comprobaciones en la eliminación de este Art.
    /**
     * Argumentos del Art
     */
    const arg = {
      ...article_args,
      status: 'private',
      content: '<p>Contenido del artículo aquí....</p>',
      categories: [...categories, a_category[0].value]
    }
    //Realizamos la petición
    const res = await HTTP.post(WP_API_POST, arg, { Authorization: `Bearer ${wpToken}` })
    if (res.data.id) {
      return new Post({ ...res.data, wpID: res.data.id });
    } else {
      return res.errCode || 'errors.internal';
    }
  }
  /**
   * Obtiene un listado de articulos de análisis 
   * @param userDataToken Datos del usuario que esta logado para poder restringir o no el contenido desde el headless dependiendo de su plan. 
   * @param wpToken Token de seguridad de WP obtenido si eres colaborador o administrador 
   * @param query Query params 
   * @returns 
   */
  async getArticles(userDataToken?: string, wpToken?: string, query?: ANALYSIS_QUERY) {
   
    let params: string = userDataToken ? `user-data=${userDataToken}&` : ''
    type query_type = 'post_status' | 'posts_per_page' | 'offset' | 's' | 'category_name' | 'tags';
    if (query) {
      if (query.post_status && query.post_status === 'public') query.post_status = 'publish';

      Object.keys(query).forEach((key) => {
        if (query[key as query_type]) {
          params += `${key}=${query[key as query_type]}&`;
        }
      })
    }
    //Si el usuario solicita los artículos privados deve ser administrador y tener el wpToken correspondiente  
    if (query?.post_status === 'private' && !wpToken) {
      return alert('Bad reques wpToken is needed to private post')
    }

    const res = await HTTP.get(`${WP_API_ANLALYSIS}articles?${params}`, HTTP.getHeaders(wpToken))
    if (res.success) {
      const posts = res.hits.map((item: any) => new Post(item));
      
      return posts
    } else {
      return [];
    }
  }
  /**
   * Obtiene un listado de articulos destacados previamente seleccionados en el wp-headless
   * @param category_name Nombre de la categoría que se desa traer los destacados
   * @param userDataToken Datos del usuario que esta logado para poder restringir o no el contenido desde el headless dependiendo de su plan. 
   * @returns 
   */
  async getOutstandingArticles(category_name?: string, userDataToken?: string) {
    let userData: string = userDataToken ? `user-data=${userDataToken}` : ''
    const res = await HTTP.get(`${WP_API_ANLALYSIS}articles?${userData}&posts_per_page=3&destacar_articulo=1&${category_name ? 'category_name=' + category_name : ''}`, HTTP.getHeaders())
    if (res.success) {
      const posts = res.hits.map((item: any) => new Post(item));
      return posts
    } else {
      return [];
    }
  }
  /**
   * Obtiene un articulo de análisis en particular
   * @param id Id del artículo
   * @returns 
   */
  async getArticle(id: string, userDataToken?: string) {
    try {
      let userData: string = userDataToken ? `user-data=${userDataToken}` : ''
      const res = await HTTP.get(`${WP_API_ANLALYSIS}articles/${id}?${userData}`);
      if (res) return new Post(res);
      else return undefined
    } catch (error) {
      console.error('async read', `${WP_API_ANLALYSIS}articles/${id}`, error);
      return undefined;
    }
  }
  /**
   * Elimina un artículo de análisis 
   * @param id Id del artículo
   * @param wpToken Token de seguridad de WP obtenido si eres colaborador o administrador 
   * @returns 
   */
  async deleteArticle(id: number, wpToken: string): Promise<void> {
    try {
      const deleted = await HTTP.delete( `${WP_API_ANLALYSIS}articles/${id}`, { Authorization: `Bearer ${wpToken}` })
      return deleted.data;
    } catch (error) {
      console.error(error)
      alert('Error inteno en user.repository')
    }
  };
}

export const AnalysisRepositoryInstance = AnalysisRepository.getInstance();