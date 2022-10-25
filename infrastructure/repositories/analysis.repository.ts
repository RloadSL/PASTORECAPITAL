export class AnalysisRepository {
  private static instance: AnalysisRepository;
  private constructor() {};

  public static getInstance(): AnalysisRepository {
    if (!AnalysisRepository.instance) {
      AnalysisRepository.instance = new AnalysisRepository();
    }
    return AnalysisRepository.instance;
  }

  createArticle = async ({category, article_args}:{category: number, article_args:{title: string}}) => {

  }
}

export const AnalysisRepositoryInstance = AnalysisRepository.getInstance();