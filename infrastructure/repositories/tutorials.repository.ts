import { Post } from "domain/Post/Post";
import Translate from "domain/Translate/Translate";
import { HTTP } from "infrastructure/http/http";
import { WP_API_POST } from "infrastructure/wordpress/config";
import { getAllPostsFromServer, getCategoryAcademy } from "infrastructure/wordpress/wp.utils";

class TutorialRepositoryImpl {
  private static instance: TutorialRepositoryImpl;
  readonly coursesPath = 'courses';
  private constructor() {

  };

  public static getInstance(): TutorialRepositoryImpl {
    if (!TutorialRepositoryImpl.instance) {
      TutorialRepositoryImpl.instance = new TutorialRepositoryImpl();
    }
    return TutorialRepositoryImpl.instance;
  }

  create = async (lesson: { title: string, excerpt: string }, wpToken: string) => {
    let primaryCat = await getCategoryAcademy('tutorial', wpToken)
    const lang = Translate.currentLocal;

    const arg = {
      ...lesson,
      lang,
      status: 'private',
      content: '<p>Contenido de la lección aquí....</p>',
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
    filters.categories = await getCategoryAcademy('tutorial')
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

export const TutorialRepositoryInstance = TutorialRepositoryImpl.getInstance();