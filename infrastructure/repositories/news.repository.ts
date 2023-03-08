import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { News } from "domain/News/News";
import  FireFirestore from "infrastructure/firebase/firestore.firebase";
import { HTTP } from "infrastructure/http/http";


export interface QUERY_NEWS {
  search?: string,
  tickers: string,
  items: number,
  page?: number
}

class NewsRepository {
  private static instance: NewsRepository;

  readonly endpointAlltickers = `https://cryptonews-api.com/api/v1/category?token=${process.env.NEXT_PUBLIC_NEWS_KEY}&section=alltickers`
  readonly endpointTickers = `https://cryptonews-api.com/api/v1?token=${process.env.NEXT_PUBLIC_NEWS_KEY}`

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
    let url = query.tickers == 'AllTickers' ? this.endpointAlltickers : this.endpointTickers;

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

  async addToFav(newFav: News, uid:string){
    await FireFirestore.createDoc('favorite_news', {...newFav, uid})
  }

  async removeFav(new_id:string){
    await FireFirestore.deleteDoc('favorite_news', new_id)
  }

  async getFavs(uid:string){
    const res = await FireFirestore.getCollectionDocs('favorite_news', undefined , [['uid', '==', uid]])
    if(!(res instanceof ErrorApp)){
      return res.map(item => ({...item.data(), id: item.id} as News));
    }else{
      return []
    }
  }

  async isFav(news_url:string, uid:string){
    const res = await FireFirestore.getCollectionDocs('favorite_news', undefined , [['uid', '==', uid], ['news_url', '==', news_url]])
    if(!(res instanceof ErrorApp)){
      return res.length >= 1;
    }else{
      return false
    }
  }
}

export default NewsRepository.getInstance()