import { News } from "domain/News/News";
import { HTTP } from "infrastructure/http/http";

export type API_NEWS_TOPICS = ''

export interface QUERY_NEWS {
  search?: string,
  topic?: API_NEWS_TOPICS,
  items: number,
  page: number
}

class NewsRepository {
  private static instance: NewsRepository;

  readonly endpoint = `https://cryptonews-api.com/api/v1/category?token=${process.env.NEXT_PUBLIC_NEWS_KEY}&section=alltickers`

  private constructor() { };

  public static getInstance(): NewsRepository {
    if (!NewsRepository.instance) {
      NewsRepository.instance = new NewsRepository();
    }
    return NewsRepository.instance;
  }

  async getNews(query: QUERY_NEWS): Promise<
    {
      data: News[],
      total_pages: number
    }> {
    let url = this.endpoint;

    const keys = Object.keys(query)
    for (let index = 0; index < keys.length; index++) {
      const key: string = keys[index];
      const value = (query as any)[key]

      url += `&${key}=${value}`
    }
    const res = await HTTP.get(url)
    res.data = res.data.map((item: any) => ({...item, date: new Date(item.date)}))
    return res;
  }
}

export default NewsRepository.getInstance()