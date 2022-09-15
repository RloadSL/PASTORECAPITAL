
import axios from 'axios';


class Http {
  private static instance: Http;
  private _headers = {
    'Content-Type': 'application/json'
  }
  private constructor() {}

  public static getInstance(): Http {
    if (!Http.instance) {
      Http.instance = new Http();
    }
    return Http.instance;
  } 
  

  get = async <T>(url: string, headers:any = {}) => {
    headers = {...this._headers, ...headers};
    const response = await axios.get(url,{headers: headers})
    return response.data;
  }
  
  post = async <T>(url: string, body: any = {}, headers:any = {}) => {
    try {
      headers = {...this._headers, ...headers};
      const response = await axios.post(url,body,{headers: headers})
      return response.data;
    } catch (error) {
      return error
    }
    
  }
  
  put = async <T>(url: string, body: any) => {
   //Implementar con axios
  }
  
  _delete = async <T>(url: string) => {
    //Implementar con axios
  }
}


export const HTTP = Http.getInstance()




