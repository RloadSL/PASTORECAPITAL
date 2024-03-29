import { HTTP } from "infrastructure/http/http"
const ELASTIC_MAIN_ENDPOINT = 'https://pastorecapital.ent.eu-west-1.aws.found.io/api/as/v1/engines/'
export type ELASTIC_ENGINES = 'services' | 'user-consultant' | 'users' | 'webinars' | 'amas'
export interface ELASTIC_QUERY {
  query:string,
  sort?: any,
  page?: {
    size: number,
    current: number
  },
  filters?: any,
  precision?:number,
  search_fields?: any
}

const _parseResult = (results:any[])=>{
  return results.map((items, index) => {
     return JSON.parse(JSON.stringify(items))
  })
}

export const elasticSearch = async (engine:ELASTIC_ENGINES, query:ELASTIC_QUERY)=>{
  const url = `${ELASTIC_MAIN_ENDPOINT}${engine}/search`
 
  const res = await HTTP.post(url,{precision: 7, ...query},{Authorization: process.env.NEXT_PUBLIC_ELASTIC_KEY})
  
  return res;
}