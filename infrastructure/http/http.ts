
import axios, { AxiosError } from 'axios';


class Http {
  private static instance: Http;
  private _headers: any = {
    'Content-Type': 'application/json'
  }
  private constructor() { }

  public static getInstance(): Http {
    if (!Http.instance) {
      Http.instance = new Http();
    }
    return Http.instance;
  }


  get = async <T>(url: string, headers: any = {}) => {
    headers = { ...this._headers, ...headers };
    const response = await axios.get(url, { headers: headers })
    return response.data;
  }

  post = async (url: string, body: any = {}, headers: any = {}): Promise<{ errCode?: string, data?: any }> => {
    try {
      headers = { ...this._headers, ...headers };
      const response = await axios.post(url, body, { headers: headers })
      return { data: response.data };
    } catch (error) {
      const err = error as any;
      console.log(err)
      const code: any = err.response.data?.code;
      console.log(err)
      return { errCode: code }
    }
  }

  delete = async <T>(url: string, headers: any = {}) => {
    headers = { ...this._headers, ...headers };
    const response = await axios.delete(url, { headers: headers })
    console.log(response)
    return response.data;
  }

  getHeaders(AuthorizationToken?: string) {
    if (AuthorizationToken) {
      return {...this._headers, Authorization : 'Bearer ' + AuthorizationToken}
    };
    return this._headers;
  }
}



export const HTTP = Http.getInstance()




