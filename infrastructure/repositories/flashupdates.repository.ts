import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { Post } from "domain/Post/Post";
import { WP_TERM } from "infrastructure/dto/wp.dto";
import { HTTP } from "infrastructure/http/http";
import { WP_API_FlUSH_UPDATES, WP_API_CATEGORY, WP_API_POST } from "infrastructure/wordpress/config";
import { getCategory } from "infrastructure/wordpress/wp.utils";

export interface FU_QUERY {
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

export class FlashUpdatesRepository {
  private static instance: FlashUpdatesRepository;
  private constructor() { };

  public static getInstance(): FlashUpdatesRepository {
    if (!FlashUpdatesRepository.instance) {
      FlashUpdatesRepository.instance = new FlashUpdatesRepository();
    }
    return FlashUpdatesRepository.instance;
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
    const fu_category = (await getCategory(undefined, 'flash-updates')) as any[]
    if(fu_category.length == 0){
      alert('Noexiste la categoría Flash Updates con el slug flush-updates ene el HEADLESS');
      return 'errors.internal';
    } 
    //Es necesario siempre asignare la categoria principal de análisis para hacer comprobaciones en la eliminación de este Art.
    /**
     * Argumentos del Art
     */
    const arg = {
      ...article_args,
      status: 'private',
      content: '<p>Contenido del artículo aquí....</p>',
      categories: [...categories, fu_category[0].id]
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
  async getArticles(userDataToken?: string, wpToken?: string, query?: FU_QUERY) {
   
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

    const res = await HTTP.get(`${WP_API_FlUSH_UPDATES}articles?${params}`, HTTP.getHeaders(wpToken))
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
    const res = await HTTP.get(`${WP_API_FlUSH_UPDATES}articles?${userData}&posts_per_page=3&destacar_articulo=1&${category_name ? 'category_name=' + category_name : ''}`, HTTP.getHeaders())
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
      const res = await HTTP.get(`${WP_API_FlUSH_UPDATES}articles/${id}?${userData}`);
      if (res) return new Post(res);
      else return undefined
    } catch (error) {
      console.error('async read', `${WP_API_FlUSH_UPDATES}articles/${id}`, error);
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
      const deleted = await HTTP.delete( `${WP_API_FlUSH_UPDATES}articles/${id}`, { Authorization: `Bearer ${wpToken}` })
      return deleted.data;
    } catch (error) {
      console.error(error)
      alert('Error inteno en user.repository')
    }
  };

  /**
   * Elimina un artículo de análisis 
   * @param id Id del artículo
   * @param id Id de la categoría del plan
   * @param wpToken Token de seguridad de WP obtenido si eres colaborador o administrador 
   * @returns 
   */
   async setPlanArticle(id: number, term_id : number, wpToken: string): Promise<void> {
    try {
      await HTTP.post( `${WP_API_FlUSH_UPDATES}articles/set-plan/${id}/${term_id}`, {},{ Authorization: `Bearer ${wpToken}` })
      return;
    } catch (error) {
      console.error(error)
      alert('Error inteno en analysis.repository')
    }
  };
}

export const FlashUpdatesRepositoryInstance = FlashUpdatesRepository.getInstance();