import { Post } from 'domain/Post/Post';
import { HTTP } from 'infrastructure/http/http';
import { WP_API_CATEGORY, WP_API_POST } from 'infrastructure/wordpress/config';
import {getAllPostsFromServer, getCategories} from '../wordpress/wp.utils'

class TaxConsultantResorses{
  private static instance: TaxConsultantResorses;
  private constructor() { };

  public static getInstance(): TaxConsultantResorses {
    if (!TaxConsultantResorses.instance) {
      TaxConsultantResorses.instance = new TaxConsultantResorses();
    }
    return TaxConsultantResorses.instance;
  }

  private getCategoryResorces = async (wpToken?: string): Promise<number> => {
    const cat = await getCategories('tax_consultant-resourse');
  
    if (cat.length === 0 && wpToken) {
      const cat = await HTTP.post(WP_API_CATEGORY, { name: 'Recursos Asesor Fiscal', slug: 'tax_consultant-resourse' }, { Authorization: `Bearer ${wpToken}` })
      return cat.data.id
    } else {
      return cat.length > 0 ? cat[0].id : -1
    }
  }

  create = async (resorce: { title: string, excerpt: string, created_by:any }, wpToken: string) => {
    let primaryCat = await this.getCategoryResorces(wpToken)
    const arg = {
      ...resorce,
      status: 'private',
      content: '<p>Nuevo recurso de asesor fiscal....</p>',
      categories: [primaryCat]
    }
    const res = await HTTP.post(WP_API_POST, arg, { Authorization: `Bearer ${wpToken}` })
    if (res.data.id) {
      return new Post({ ...res.data, wpID: res.data.id });
    } else {
      return res.errCode;
    }
  }


  async read(id: string): Promise<Post | undefined> {
    try {
      const res = await HTTP.get(`${WP_API_POST}/${id}`);
      if (res) return new Post(res);
      else return undefined
    } catch (error) {
      console.error('async read', `${WP_API_POST}/${id}`);
      return undefined;
    }
  };

  async readAll(offset?: number, filters?: any, wpToken?: string): Promise<Post[]> {
    filters.categories = await this.getCategoryResorces(wpToken)
    const response = await getAllPostsFromServer(offset, filters, wpToken)
    return response.map((item: any) => new Post(item));
  };

  async delete(id: number, wpToken: string): Promise<void> {
    try {
      const deleted = await HTTP.delete(WP_API_POST + `/${id}?force=true`, { Authorization: `Bearer ${wpToken}` })
      return deleted.data;
    } catch (error) {
      console.error(error)
      console.error('Error inteno en user.repository')
    }
  };
}

export default TaxConsultantResorses.getInstance()