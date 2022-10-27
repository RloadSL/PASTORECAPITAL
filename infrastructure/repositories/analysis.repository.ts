import { Post } from "domain/Post/Post";
import { HTTP } from "infrastructure/http/http";
import { WP_API_POST } from "infrastructure/wordpress/config";

export class AnalysisRepository {
  private static instance: AnalysisRepository;
  private constructor() {};

  public static getInstance(): AnalysisRepository {
    if (!AnalysisRepository.instance) {
      AnalysisRepository.instance = new AnalysisRepository();
    }
    return AnalysisRepository.instance;
  }
  
  createArticle = async ({categories, wpToken,article_args}:{categories: number[],wpToken:string , article_args:{title: string, excerpt?: string}}) => {
     const arg = {
      ...article_args,
      status: 'private',
      content: '<p>Contenido de la lección aquí....</p>',
      categories
    }
    const res = await HTTP.post(WP_API_POST, arg, { Authorization: `Bearer ${wpToken}` })
    if (res.data.id) {
      return new Post({ ...res.data, wpID: res.data.id });
    } else {
      return res.errCode;
    }
  }
}

export const AnalysisRepositoryInstance = AnalysisRepository.getInstance();