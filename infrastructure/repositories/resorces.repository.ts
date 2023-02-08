import { Post } from 'domain/Post/Post';
import { HTTP } from 'infrastructure/http/http';
import { WP_API_CATEGORY, WP_API_POST } from 'infrastructure/wordpress/config';
import {getCategories} from '../wordpress/wp.utils'

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

  create = async (lesson: { title: string, excerpt: string }, wpToken: string) => {
    let primaryCat = await this.getCategoryResorces(wpToken)
    const arg = {
      ...lesson,
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
}

export default TaxConsultantResorses.getInstance()