import { HTTP } from "infrastructure/http/http"
const ELASTIC_MAIN_ENDPOINT = 'https://my-deployment-12105e.ent.europe-west1.gcp.cloud.es.io/api/as/v1/engines/'
export type ELASTIC_ENGINES = 'services' | 'user-consultant' | 'users' 
export interface ELASTIC_QUERY {
  query:string,
  page?: {
    size: number,
    current: number
  },
  filters?: any,
  precision?:number
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